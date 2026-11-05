import React, { useState } from 'react';
import { DECORATION_CATEGORIES, DECORATION_ITEMS } from '../../data/decorationItems';
import { Search, Plus, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DecorationSidebar = ({ onAddDecoration, collapsed, onToggleCollapse }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = DECORATION_ITEMS.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesQuery;
  });

  return (
    <aside
      className={`relative transition-all duration-300 z-20 flex flex-col h-full bg-midnight-950/90 backdrop-blur-xl border-r border-gold/20 ${
        collapsed ? 'w-12' : 'w-72 sm:w-80'
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3.5 top-5 z-30 w-7 h-7 rounded-full bg-gradient-to-tr from-gold to-festive-orange text-midnight-950 flex items-center justify-center shadow-glow-gold hover:scale-110 transition-transform"
        title={collapsed ? 'Expand Decorations' : 'Collapse Sidebar'}
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {collapsed ? (
        <div className="py-6 flex flex-col items-center space-y-6">
          <Sparkles className="w-5 h-5 text-gold animate-pulse" />
          <span className="text-[10px] tracking-widest text-gold-warm uppercase [writing-mode:vertical-lr] rotate-180">
            Decorations
          </span>
        </div>
      ) : (
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gold/15">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-serif font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Decorations</span>
              </h3>
              <span className="text-[11px] text-gold-warm bg-darkPurple-900/80 px-2 py-0.5 rounded-full border border-gold/20">
                {filteredItems.length} elements
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gold/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search diyas, lights, flowers..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-midnight-900 border border-gold/20 text-white placeholder-festive-cream/40 focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* Category Chips (Horizontal scrollable) */}
          <div className="px-3 py-2 border-b border-gold/10 overflow-x-auto flex space-x-1.5 scrollbar-none">
            {DECORATION_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 py-1 text-[11px] whitespace-nowrap rounded-md font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-gold to-festive-orange text-midnight-950 font-bold shadow-sm'
                    : 'text-festive-cream/70 hover:text-white hover:bg-gold/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Item Grid */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {filteredItems.length === 0 ? (
              <div className="text-center py-8 text-xs text-festive-cream/60">
                No decorative elements found.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onAddDecoration(item)}
                    className="group relative cursor-pointer rounded-xl glass-card p-2 border border-gold/20 hover:border-gold/60 transition-all shadow-md flex flex-col items-center text-center overflow-hidden"
                  >
                    {/* Glow background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-festive-orange/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Image Thumbnail */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center p-1 relative z-10">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain filter group-hover:drop-shadow-[0_0_8px_rgba(244,199,106,0.8)] transition-all"
                        loading="lazy"
                      />
                    </div>

                    {/* Meta */}
                    <div className="mt-1 w-full relative z-10">
                      <p className="text-[11px] font-semibold text-festive-cream truncate group-hover:text-gold-warm">
                        {item.name}
                      </p>
                      <p className="text-[9px] text-festive-cream/50 truncate capitalize">
                        {item.category.replace('_', ' ')}
                      </p>
                    </div>

                    {/* Plus Badge */}
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-midnight-950/70 text-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-gold/30">
                      <Plus className="w-3 h-3" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};
