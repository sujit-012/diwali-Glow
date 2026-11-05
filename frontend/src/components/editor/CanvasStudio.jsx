import React, { useEffect, useRef, useState, useCallback } from 'react';
import { fabric } from 'fabric';
import { StudioToolbar } from './StudioToolbar';
import { DecorationSidebar } from './DecorationSidebar';
import { PropertyInspector } from './PropertyInspector';
import { BeforeAfterSlider } from '../comparison/BeforeAfterSlider';
import { triggerFestiveFireworks } from '../common/FireworksEffect';
import { soundEngine } from '../../utils/audioEffects';
import { useProject } from '../../context/ProjectContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import toast from 'react-hot-toast';
import { DECORATION_ITEMS } from '../../data/decorationItems';
import { X, Check, Image as ImageIcon } from 'lucide-react';

export const CanvasStudio = () => {
  const canvasElRef = useRef(null);
  const containerRef = useRef(null);
  const fabricRef = useRef(null);

  const {
    activeRoomImage,
    activeRoomType,
    activeTheme,
    projectName,
    currentProjectId,
    activePresetDecorations,
    setComparisonResult,
  } = useProject();

  const { isAuthenticated, openAuthModal } = useAuth();

  // Selection & UI state
  const [selectedObject, setSelectedObject] = useState(null);
  const [decorationsCount, setDecorationsCount] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [exportedCanvasImage, setExportedCanvasImage] = useState(null);

  // Undo / Redo history stacks
  const historyRef = useRef([]);
  const historyIndexRef = useRef(-1);
  const isUpdatingHistory = useRef(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Configure Fabric Controls (Gold styling)
  const configureObjectControls = (obj) => {
    obj.set({
      borderColor: '#F4C76A',
      cornerColor: '#D9A441',
      cornerStrokeColor: '#101321',
      cornerStyle: 'circle',
      cornerSize: 10,
      transparentCorners: false,
      padding: 6,
      rotatingPointOffset: 24,
      shadow: new fabric.Shadow({
        color: 'rgba(232, 117, 50, 0.45)',
        blur: 15,
        offsetX: 0,
        offsetY: 4,
      }),
    });
  };

  // Push state to undo stack
  const saveStateToHistory = useCallback(() => {
    if (!fabricRef.current || isUpdatingHistory.current) return;
    const canvas = fabricRef.current;
    const json = JSON.stringify(canvas.toJSON(['id', 'category', 'customType']));

    // Truncate redo states
    const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
    newHistory.push(json);

    // Limit history stack
    if (newHistory.length > 25) newHistory.shift();

    historyRef.current = newHistory;
    historyIndexRef.current = newHistory.length - 1;

    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(false);
    updateDecorationsCount();
  }, []);

  const updateDecorationsCount = () => {
    if (!fabricRef.current) return;
    const count = fabricRef.current.getObjects().filter((o) => o.customType === 'decoration').length;
    setDecorationsCount(count);
  };

  // Initialize Canvas
  useEffect(() => {
    if (!canvasElRef.current) return;

    // Dimensions: base 800 x 500 resolution
    const canvas = new fabric.Canvas(canvasElRef.current, {
      width: 800,
      height: 520,
      backgroundColor: '#101321',
      preserveObjectStacking: true,
      selection: true,
    });

    fabricRef.current = canvas;

    // Setup Room Background Image
    loadRoomBackground(activeRoomImage);

    // Event listeners
    canvas.on('selection:created', (e) => setSelectedObject(e.selected ? e.selected[0] : null));
    canvas.on('selection:updated', (e) => setSelectedObject(e.selected ? e.selected[0] : null));
    canvas.on('selection:cleared', () => setSelectedObject(null));
    canvas.on('object:modified', () => {
      saveStateToHistory();
      if (canvas.getActiveObject()) {
        setSelectedObject({ ...canvas.getActiveObject() });
      }
    });

    // Keyboard Shortcuts
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const active = canvas.getActiveObject();
        if (active && active.customType === 'decoration') {
          canvas.remove(active);
          canvas.discardActiveGroup ? canvas.discardActiveGroup() : canvas.discardActiveObject();
          canvas.renderAll();
          setSelectedObject(null);
          saveStateToHistory();
        }
      } else if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') {
          e.preventDefault();
          handleUndo();
        } else if (e.key === 'y') {
          e.preventDefault();
          handleRedo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      canvas.dispose();
    };
  }, []);

  // Update room background when activeRoomImage changes
  useEffect(() => {
    if (fabricRef.current && activeRoomImage) {
      loadRoomBackground(activeRoomImage);
    }
  }, [activeRoomImage]);

  // Load preset decorations if navigated from Explore Themes
  useEffect(() => {
    if (fabricRef.current && activePresetDecorations && activePresetDecorations.length > 0) {
      const canvas = fabricRef.current;
      // Clear existing decorations
      const existing = canvas.getObjects().filter((o) => o.customType === 'decoration');
      existing.forEach((o) => canvas.remove(o));

      // Add presets
      activePresetDecorations.forEach((preset) => {
        const item = DECORATION_ITEMS.find((d) => d.id === preset.id);
        if (item) {
          fabric.Image.fromURL(
            item.image,
            (img) => {
              if (!img) return;
              img.set({
                left: preset.left || 300,
                top: preset.top || 250,
                originX: 'center',
                originY: 'center',
                scaleX: (item.defaultWidth / (img.width || 1)) * (preset.scale || 1),
                scaleY: (item.defaultHeight / (img.height || 1)) * (preset.scale || 1),
                customType: 'decoration',
                itemId: item.id,
              });
              configureObjectControls(img);
              canvas.add(img);
              canvas.renderAll();
              updateDecorationsCount();
            },
            { crossOrigin: 'anonymous' }
          );
        }
      });
      saveStateToHistory();
    }
  }, [activePresetDecorations]);

  const loadRoomBackground = (imageUrl) => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    fabric.Image.fromURL(
      imageUrl,
      (img) => {
        if (!img) return;
        // Scale proportionally to fill 800 x 520
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        img.set({
          originX: 'center',
          originY: 'center',
          left: canvas.width / 2,
          top: canvas.height / 2,
          scaleX: scale,
          scaleY: scale,
          selectable: false,
          evented: false,
        });
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        saveStateToHistory();
      },
      { crossOrigin: 'anonymous' }
    );
  };

  // Add a decoration element onto canvas
  const handleAddDecoration = (item) => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    fabric.Image.fromURL(
      item.image,
      (img) => {
        if (!img) return;

        // Position near center with slight random offset
        const offsetX = (Math.random() - 0.5) * 80;
        const offsetY = (Math.random() - 0.5) * 80;

        img.set({
          left: canvas.width / 2 + offsetX,
          top: canvas.height / 2 + offsetY,
          originX: 'center',
          originY: 'center',
          scaleX: item.defaultWidth / (img.width || 1),
          scaleY: item.defaultHeight / (img.height || 1),
          customType: 'decoration',
          itemId: item.id,
        });

        configureObjectControls(img);
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        setSelectedObject(img);
        saveStateToHistory();

        soundEngine.playSparklerSound(0.4, 0.3);
        toast.success(`Added ${item.name} ✨`, { duration: 1800 });
      },
      { crossOrigin: 'anonymous' }
    );
  };

  // Property Inspector updates
  const handleUpdateProperty = (prop, value) => {
    const canvas = fabricRef.current;
    const active = canvas?.getActiveObject();
    if (!active) return;

    active.set(prop, value);
    canvas.renderAll();
    setSelectedObject({ ...active });
    saveStateToHistory();
  };

  const handleBringForward = () => {
    const canvas = fabricRef.current;
    const active = canvas?.getActiveObject();
    if (active) {
      canvas.bringForward(active);
      canvas.renderAll();
      saveStateToHistory();
    }
  };

  const handleSendBackward = () => {
    const canvas = fabricRef.current;
    const active = canvas?.getActiveObject();
    if (active) {
      canvas.sendBackwards(active);
      canvas.renderAll();
      saveStateToHistory();
    }
  };

  const handleBringToFront = () => {
    const canvas = fabricRef.current;
    const active = canvas?.getActiveObject();
    if (active) {
      canvas.bringToFront(active);
      canvas.renderAll();
      saveStateToHistory();
    }
  };

  const handleSendToBack = () => {
    const canvas = fabricRef.current;
    const active = canvas?.getActiveObject();
    if (active) {
      canvas.sendToBack(active);
      // Keep background image beneath
      canvas.renderAll();
      saveStateToHistory();
    }
  };

  const handleDuplicate = () => {
    const canvas = fabricRef.current;
    const active = canvas?.getActiveObject();
    if (!active) return;

    active.clone((cloned) => {
      cloned.set({
        left: active.left + 25,
        top: active.top + 25,
      });
      configureObjectControls(cloned);
      canvas.add(cloned);
      canvas.setActiveObject(cloned);
      canvas.renderAll();
      setSelectedObject(cloned);
      saveStateToHistory();
      soundEngine.playCrackerPop(0.25);
      toast.success('Element duplicated');
    });
  };

  const handleDelete = () => {
    const canvas = fabricRef.current;
    const active = canvas?.getActiveObject();
    if (active) {
      canvas.remove(active);
      canvas.discardActiveObject();
      canvas.renderAll();
      setSelectedObject(null);
      saveStateToHistory();
      soundEngine.playCrackerPop(0.2);
      toast.success('Element deleted');
    }
  };

  // Undo / Redo
  const handleUndo = () => {
    if (historyIndexRef.current <= 0 || !fabricRef.current) return;
    isUpdatingHistory.current = true;
    historyIndexRef.current -= 1;
    const state = historyRef.current[historyIndexRef.current];

    fabricRef.current.loadFromJSON(state, () => {
      fabricRef.current.renderAll();
      isUpdatingHistory.current = false;
      setCanUndo(historyIndexRef.current > 0);
      setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
      updateDecorationsCount();
      setSelectedObject(fabricRef.current.getActiveObject());
    });
  };

  const handleRedo = () => {
    if (
      historyIndexRef.current >= historyRef.current.length - 1 ||
      !fabricRef.current
    )
      return;
    isUpdatingHistory.current = true;
    historyIndexRef.current += 1;
    const state = historyRef.current[historyIndexRef.current];

    fabricRef.current.loadFromJSON(state, () => {
      fabricRef.current.renderAll();
      isUpdatingHistory.current = false;
      setCanUndo(historyIndexRef.current > 0);
      setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
      updateDecorationsCount();
      setSelectedObject(fabricRef.current.getActiveObject());
    });
  };

  // Zoom
  const handleZoom = (newZoom) => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const clamped = Math.min(Math.max(newZoom, 0.5), 2.5);
    setZoom(clamped);
    canvas.setZoom(clamped);
    canvas.renderAll();
  };

  const handleResetZoom = () => handleZoom(1);
  const handleZoomIn = () => handleZoom(zoom + 0.15);
  const handleZoomOut = () => handleZoom(zoom - 0.15);

  const handleResetCanvas = () => {
    if (!fabricRef.current) return;
    if (window.confirm('Clear all decorations from your room?')) {
      const canvas = fabricRef.current;
      const decorations = canvas.getObjects().filter((o) => o.customType === 'decoration');
      decorations.forEach((o) => canvas.remove(o));
      canvas.renderAll();
      setSelectedObject(null);
      saveStateToHistory();
      toast.success('Canvas reset');
    }
  };

  // Download Final Decorated Image
  const handleDownload = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    // Deselect object before exporting
    canvas.discardActiveObject();
    canvas.renderAll();

    const dataUrl = canvas.toDataURL({
      format: 'jpeg',
      quality: 0.95,
      multiplier: 2, // 2x HD export
    });

    const link = document.createElement('a');
    link.download = `diwaliglow-${projectName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.jpg`;
    link.href = dataUrl;
    link.click();

    triggerFestiveFireworks();
    toast.success('Decorated room downloaded in High Definition! 🎆');
  };

  // Save Design to MongoDB
  const handleSaveDesign = async () => {
    if (!isAuthenticated) {
      toast('Please sign in to save your design to your account', { icon: '🪔' });
      openAuthModal('login');
      return;
    }

    const canvas = fabricRef.current;
    if (!canvas) return;

    setIsSaving(true);
    try {
      canvas.discardActiveObject();
      canvas.renderAll();

      const previewImage = canvas.toDataURL({
        format: 'jpeg',
        quality: 0.85,
        multiplier: 1,
      });

      const canvasState = canvas.toJSON(['id', 'category', 'customType', 'itemId']);

      const payload = {
        projectName,
        roomType: activeRoomType,
        originalImage: activeRoomImage,
        selectedTheme: activeTheme,
        canvasState,
        previewImage,
        decorationsCount,
      };

      let res;
      if (currentProjectId) {
        res = await api.updateProject(currentProjectId, payload);
      } else {
        res = await api.createProject(payload);
      }

      if (res.success) {
        triggerFestiveFireworks();
        toast.success('Design saved successfully to My Designs! ✨');

        // Also record transformation
        await api.saveTransformation({
          projectId: res.project?._id || currentProjectId,
          originalImage: activeRoomImage,
          transformedImage: previewImage,
          decorationElements: canvas.getObjects().map((o) => ({
            id: o.itemId,
            scale: o.scaleX,
            left: o.left,
            top: o.top,
          })),
          transformationType: 'manual',
          theme: activeTheme,
        });

        // Set comparison data
        setComparisonResult({
          originalImage: activeRoomImage,
          transformedImage: previewImage,
          theme: activeTheme,
          title: projectName,
          decorationsCount,
        });
      } else {
        toast.error(res.message || 'Could not save project');
      }
    } catch (err) {
      toast.error('Network error while saving project');
    } finally {
      setIsSaving(false);
    }
  };

  // Compare Before & After
  const handleToggleCompare = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    canvas.discardActiveObject();
    canvas.renderAll();

    const currentExport = canvas.toDataURL({
      format: 'jpeg',
      quality: 0.9,
    });

    setExportedCanvasImage(currentExport);
    setShowCompareModal(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-68px)] mt-[68px] overflow-hidden bg-midnight-950">
      {/* Top Toolbar */}
      <StudioToolbar
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={handleResetZoom}
        onResetCanvas={handleResetCanvas}
        onSaveDesign={handleSaveDesign}
        onDownload={handleDownload}
        onToggleCompare={handleToggleCompare}
        isSaving={isSaving}
      />

      {/* Main Studio Body: Left Sidebar + Canvas Center + Right Inspector */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Decorations Catalog */}
        <DecorationSidebar
          onAddDecoration={handleAddDecoration}
          collapsed={leftCollapsed}
          onToggleCollapse={() => setLeftCollapsed(!leftCollapsed)}
        />

        {/* Center Canvas Area */}
        <main
          ref={containerRef}
          className="flex-1 overflow-auto flex items-center justify-center p-4 bg-gradient-radial from-darkPurple-900/40 via-midnight-950 to-midnight-950 relative"
        >
          {/* Subtle Ambient Vignette */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]" />

          {/* Canvas Wrapper */}
          <div className="relative rounded-2xl p-1 bg-gradient-to-tr from-gold/30 via-darkPurple-800 to-festive-orange/30 shadow-2xl">
            <canvas ref={canvasElRef} />
          </div>
        </main>

        {/* Right Property Inspector */}
        <PropertyInspector
          selectedObject={selectedObject}
          onUpdateProperty={handleUpdateProperty}
          onBringForward={handleBringForward}
          onSendBackward={handleSendBackward}
          onBringToFront={handleBringToFront}
          onSendToBack={handleSendToBack}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
          collapsed={rightCollapsed}
          onToggleCollapse={() => setRightCollapsed(!rightCollapsed)}
          decorationsCount={decorationsCount}
          activeTheme={activeTheme}
        />
      </div>

      {/* Before / After Preview Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl rounded-2xl glass-panel-elevated p-6 border border-gold/40 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-white">
                  Before & After <span className="text-gold-gradient">Comparison</span>
                </h3>
                <p className="text-xs text-festive-cream/70">
                  Drag the slider to see the festive transformation of your room.
                </p>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="p-1.5 rounded-full text-festive-cream/60 hover:text-white hover:bg-gold/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <BeforeAfterSlider
              beforeImage={activeRoomImage}
              afterImage={exportedCanvasImage || activeRoomImage}
              className="max-h-[60vh]"
            />

            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold glass-card text-festive-cream hover:text-white"
              >
                Return to Editor
              </button>
              <button
                onClick={() => {
                  setShowCompareModal(false);
                  handleDownload();
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-gold to-festive-orange text-midnight-950 shadow-glow-gold"
              >
                Download This Look
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
