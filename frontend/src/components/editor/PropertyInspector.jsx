import React from 'react';
import {
  Sliders,
  Layers,
  RotateCw,
  Copy,
  Trash2,
  FlipHorizontal,
  FlipVertical,
  ArrowUp,
  ArrowDown,
  Sparkles,
  SunMedium,
  Lock,
  Unlock,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

export const PropertyInspector = ({
  selectedObject,
  onUpdateProperty,
  onBringForward,
  onSendBackward,
  onBringToFront,
  onSendToBack,
  onDuplicate,
  onDelete,
  collapsed,
  onToggleCollapse,
  decorationsCount = 0,
  activeTheme = 'Traditional Diwali',
}) => {
  return (
    <aside
      className={`relative transition-all duration-300 z-20 flex flex-col h-full bg-midnight-950/90 backdrop-blur-xl border-l border-gold/20 ${
        collapsed ? 'w-12' : 'w-72 sm:w-80'
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={onToggleCollapse}
        className="absolute -left-3.5 top-5 z-30 w-7 h-7 rounded-full bg-gradient-to-tr from-gold to-festive-orange text-midnight-950 flex items-center justify-center shadow-glow-gold hover:scale-110 transition-transform"
        title={collapsed ? 'Expand Properties' : 'Collapse Inspector'}
      >
        {collapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {collapsed ? (
        <div className="py-6 flex flex-col items-center space-y-6">
          <Sliders className="w-5 h-5 text-gold animate-pulse" />
          <span className="text-[10px] tracking-widest text-gold-warm uppercase [writing-mode:vertical-lr] rotate-180">
            Properties
          </span>
        </div>
      ) : (
        <div className="flex flex-col h-full overflow-y-auto p-4 space-y-5">
          {/* Header */}
          <div className="border-b border-gold/15 pb-3">
            <h3 className="text-base font-serif font-bold text-white flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-gold" />
              <span>{selectedObject ? 'Element Properties' : 'Studio Inspector'}</span>
            </h3>
            <p className="text-[11px] text-festive-cream/60 mt-0.5">
              {selectedObject ? 'Fine-tune position, glow and layers' : 'Room canvas overview'}
            </p>
          </div>

          {selectedObject ? (
            <div className="space-y-4">
              {/* Opacity Control */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-festive-cream/80 flex items-center space-x-1.5">
                    <SunMedium className="w-3.5 h-3.5 text-gold" />
                    <span>Luminosity / Opacity</span>
                  </span>
                  <span className="text-gold font-mono">
                    {Math.round((selectedObject.opacity ?? 1) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={selectedObject.opacity ?? 1}
                  onChange={(e) => onUpdateProperty('opacity', parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-midnight-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Scale / Size Control */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-festive-cream/80 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>Element Size</span>
                  </span>
                  <span className="text-gold font-mono">
                    {Math.round((selectedObject.scaleX ?? 1) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.05"
                  value={selectedObject.scaleX ?? 1}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    onUpdateProperty('scaleX', val);
                    onUpdateProperty('scaleY', val);
                  }}
                  className="w-full h-1.5 bg-midnight-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Rotation Angle */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-festive-cream/80 flex items-center space-x-1.5">
                    <RotateCw className="w-3.5 h-3.5 text-gold" />
                    <span>Rotation Angle</span>
                  </span>
                  <span className="text-gold font-mono">
                    {Math.round(selectedObject.angle ?? 0)}°
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={Math.round(selectedObject.angle ?? 0)}
                  onChange={(e) => onUpdateProperty('angle', parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-midnight-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Flip Controls */}
              <div className="pt-2">
                <span className="text-xs text-festive-cream/70 block mb-2 font-medium">
                  Transform & Mirror
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onUpdateProperty('flipX', !selectedObject.flipX)}
                    className={`py-2 px-3 rounded-lg text-xs flex items-center justify-center space-x-1.5 border transition-all ${
                      selectedObject.flipX
                        ? 'bg-gold/20 border-gold text-gold-warm font-semibold'
                        : 'glass-card border-gold/20 text-festive-cream hover:bg-gold/10'
                    }`}
                  >
                    <FlipHorizontal className="w-3.5 h-3.5" />
                    <span>Flip X</span>
                  </button>
                  <button
                    onClick={() => onUpdateProperty('flipY', !selectedObject.flipY)}
                    className={`py-2 px-3 rounded-lg text-xs flex items-center justify-center space-x-1.5 border transition-all ${
                      selectedObject.flipY
                        ? 'bg-gold/20 border-gold text-gold-warm font-semibold'
                        : 'glass-card border-gold/20 text-festive-cream hover:bg-gold/10'
                    }`}
                  >
                    <FlipVertical className="w-3.5 h-3.5" />
                    <span>Flip Y</span>
                  </button>
                </div>
              </div>

              {/* Layer Ordering Controls */}
              <div className="pt-2">
                <span className="text-xs text-festive-cream/70 block mb-2 font-medium flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-gold" />
                  <span>Layer Stacking</span>
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={onBringForward}
                    className="py-1.5 px-2 rounded-lg text-xs glass-card border border-gold/20 text-festive-cream hover:bg-gold/10 flex items-center justify-center space-x-1"
                    title="Bring Forward"
                  >
                    <ArrowUp className="w-3 h-3 text-gold" />
                    <span>Bring Forward</span>
                  </button>
                  <button
                    onClick={onSendBackward}
                    className="py-1.5 px-2 rounded-lg text-xs glass-card border border-gold/20 text-festive-cream hover:bg-gold/10 flex items-center justify-center space-x-1"
                    title="Send Backward"
                  >
                    <ArrowDown className="w-3 h-3 text-gold" />
                    <span>Send Back</span>
                  </button>
                  <button
                    onClick={onBringToFront}
                    className="py-1.5 px-2 rounded-lg text-[11px] glass-card border border-gold/20 text-festive-cream hover:bg-gold/10 flex items-center justify-center space-x-1"
                  >
                    <span>To Front</span>
                  </button>
                  <button
                    onClick={onSendToBack}
                    className="py-1.5 px-2 rounded-lg text-[11px] glass-card border border-gold/20 text-festive-cream hover:bg-gold/10 flex items-center justify-center space-x-1"
                  >
                    <span>To Bottom</span>
                  </button>
                </div>
              </div>

              {/* Actions: Duplicate & Delete */}
              <div className="pt-3 border-t border-gold/15 grid grid-cols-2 gap-2">
                <button
                  onClick={onDuplicate}
                  className="py-2 px-3 rounded-lg text-xs font-semibold bg-darkPurple-900 border border-gold/30 text-gold-warm hover:bg-gold/20 transition-all flex items-center justify-center space-x-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Duplicate</span>
                </button>
                <button
                  onClick={onDelete}
                  className="py-2 px-3 rounded-lg text-xs font-semibold bg-red-950/40 border border-red-500/30 text-red-300 hover:bg-red-500/20 transition-all flex items-center justify-center space-x-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl glass-card p-4 border border-gold/20 space-y-2">
                <p className="text-xs font-medium text-gold-warm flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Active Theme: {activeTheme}</span>
                </p>
                <p className="text-xs text-festive-cream/70 leading-relaxed">
                  Click any element from the left panel to place it in your room, or tap an existing decoration on canvas to edit its size, glow, angle and layers.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-midnight-900/60 border border-gold/15 space-y-1">
                <div className="flex justify-between text-xs text-festive-cream/80">
                  <span>Decorations on Canvas:</span>
                  <span className="font-bold text-gold">{decorationsCount}</span>
                </div>
                <div className="flex justify-between text-xs text-festive-cream/80">
                  <span>Canvas Resolution:</span>
                  <span className="font-mono text-festive-cream/60">HD Scaled</span>
                </div>
              </div>

              <div className="rounded-xl border border-gold/15 p-3 space-y-2 text-[11px] text-festive-cream/60">
                <p className="font-semibold text-white">Keyboard Shortcuts:</p>
                <div className="space-y-1 font-mono text-[10px]">
                  <p><span className="text-gold">Delete / Backspace:</span> Remove element</p>
                  <p><span className="text-gold">Drag Corner:</span> Resize proportionally</p>
                  <p><span className="text-gold">Top Knob:</span> Rotate decoration</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
