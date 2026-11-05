import React from 'react';
import {
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Save,
  SplitSquareVertical,
  Sparkles,
} from 'lucide-react';

export const StudioToolbar = ({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onResetCanvas,
  onSaveDesign,
  onDownload,
  onToggleCompare,
  isSaving,
}) => {
  return (
    <div className="w-full flex items-center justify-between px-3 sm:px-6 py-2.5 bg-midnight-950/80 backdrop-blur-md border-b border-gold/20 shadow-md">
      {/* Left: History & Zoom */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        {/* Undo / Redo */}
        <div className="flex items-center bg-midnight-900 rounded-lg p-0.5 border border-gold/20">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`p-1.5 rounded-md transition-colors ${
              canUndo
                ? 'text-festive-cream hover:text-gold hover:bg-gold/10'
                : 'text-festive-cream/30 cursor-not-allowed'
            }`}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`p-1.5 rounded-md transition-colors ${
              canRedo
                ? 'text-festive-cream hover:text-gold hover:bg-gold/10'
                : 'text-festive-cream/30 cursor-not-allowed'
            }`}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center bg-midnight-900 rounded-lg p-0.5 border border-gold/20">
          <button
            onClick={onZoomOut}
            className="p-1.5 rounded-md text-festive-cream hover:text-gold hover:bg-gold/10 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={onResetZoom}
            className="px-2 py-1 text-xs font-mono text-gold-warm hover:text-white"
            title="Reset Zoom"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            onClick={onZoomIn}
            className="p-1.5 rounded-md text-festive-cream hover:text-gold hover:bg-gold/10 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Reset Canvas */}
        <button
          onClick={onResetCanvas}
          className="p-1.5 rounded-lg text-festive-cream/70 hover:text-red-400 hover:bg-red-500/10 border border-gold/20 transition-colors"
          title="Reset Decorations"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Compare, Save, Download */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Before / After toggle button */}
        <button
          onClick={onToggleCompare}
          className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium glass-card border-gold/30 text-gold-warm hover:bg-gold/10 transition-all flex items-center space-x-1.5"
          title="Compare Before & After"
        >
          <SplitSquareVertical className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Compare</span>
        </button>

        {/* Save Project Button */}
        <button
          onClick={onSaveDesign}
          disabled={isSaving}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-darkPurple-900 border border-gold/40 text-festive-cream hover:border-gold hover:text-white transition-all flex items-center space-x-1.5 shadow-sm"
        >
          <Save className="w-3.5 h-3.5 text-gold" />
          <span>{isSaving ? 'Saving...' : 'Save Design'}</span>
        </button>

        {/* Download Button */}
        <button
          onClick={onDownload}
          className="px-3.5 sm:px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-gold via-gold-warm to-festive-orange text-midnight-950 shadow-glow-gold hover:shadow-glow-gold-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center space-x-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};
