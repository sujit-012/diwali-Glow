import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProject } from '../context/ProjectContext';
import { SAMPLE_ROOMS, ROOM_CATEGORIES } from '../data/sampleRooms';
import { THEMES_DATA } from '../data/themesData';
import { triggerFestiveFireworks } from '../components/common/FireworksEffect';
import { DiyaFlame } from '../components/common/DiyaFlame';
import toast from 'react-hot-toast';
import {
  UploadCloud,
  Image as ImageIcon,
  CheckCircle2,
  Trash2,
  RefreshCw,
  ArrowRight,
  Sparkles,
  Bot,
  Brush,
} from 'lucide-react';

export const UploadRoomPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { selectRoom, activeRoomImage, activeRoomType, applyTheme } = useProject();

  const [selectedRoomType, setSelectedRoomType] = useState('Living Room');
  const [selectedTheme, setSelectedTheme] = useState('Traditional Diwali');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Validate and handle file
  const handleFile = (file) => {
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image (JPG, JPEG, PNG, or WEBP)');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      toast.error('Image size must be less than 15MB');
      return;
    }

    // Simulate animated upload progress
    setIsUploading(true);
    setUploadProgress(15);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 120);

    const reader = new FileReader();
    reader.onload = (e) => {
      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);
        setTimeout(() => {
          setIsUploading(false);
          setPreviewUrl(e.target.result);
          toast.success('Room photograph uploaded successfully! 🪔');
        }, 300);
      }, 600);
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelectSample = (sample) => {
    setPreviewUrl(sample.image);
    setSelectedRoomType(sample.category);
    toast.success(`Loaded ${sample.name}`);
  };

  const handleContinueToStudio = () => {
    const finalImage = previewUrl || activeRoomImage;
    selectRoom(finalImage, selectedRoomType);
    applyTheme(selectedTheme);
    triggerFestiveFireworks();
    navigate('/studio');
  };

  const handleContinueToAI = () => {
    const finalImage = previewUrl || activeRoomImage;
    selectRoom(finalImage, selectedRoomType);
    applyTheme(selectedTheme);
    navigate('/ai-transform');
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-darkPurple-900/80 border border-gold/30 text-xs font-semibold text-gold-warm mb-3 shadow-glow-gold">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Step 1: Your Room Photograph</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Let's Transform <span className="text-gold-gradient">Your Space.</span>
        </h1>
        <p className="text-sm sm:text-base text-festive-cream/80 mt-2">
          Upload your actual room photograph or choose from our architectural sample spaces below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Upload Zone & Configuration */}
        <div className="lg:col-span-7 space-y-6">
          {/* Room Category Selector */}
          <div className="rounded-2xl glass-card p-5 border border-gold/25 space-y-3">
            <label className="block text-xs font-semibold text-gold-warm uppercase tracking-wider">
              1. Select Room Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ROOM_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedRoomType(cat)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                    selectedRoomType === cat
                      ? 'bg-gradient-to-r from-gold to-festive-orange text-midnight-950 font-bold shadow-md'
                      : 'glass-panel border-gold/20 text-festive-cream/80 hover:text-white hover:bg-gold/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Dropzone */}
          <div className="rounded-2xl glass-panel-elevated p-6 border border-gold/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gold-warm uppercase tracking-wider">
                2. Upload Room Photo
              </label>
              <span className="text-[11px] text-festive-cream/60">JPG, PNG, WEBP (Max 15MB)</span>
            </div>

            {previewUrl ? (
              /* Preview Area */
              <div className="space-y-4">
                <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-gold/50 shadow-xl group">
                  <img
                    src={previewUrl}
                    alt="Uploaded Room"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                    <span className="text-xs font-semibold text-gold-warm">
                      {selectedRoomType} Ready
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 rounded-lg bg-midnight-900/80 text-white hover:text-gold border border-gold/30"
                        title="Replace Photo"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setPreviewUrl(null)}
                        className="p-2 rounded-lg bg-red-950/80 text-red-300 hover:text-white border border-red-500/30"
                        title="Remove Photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-midnight-900/70 border border-gold/20 text-xs">
                  <span className="flex items-center space-x-2 text-green-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Photo Verified & Scaled</span>
                  </span>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-gold hover:text-gold-warm underline text-xs"
                  >
                    Upload Different Image
                  </button>
                </div>
              </div>
            ) : (
              /* Drag & Drop Container */
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-300 flex flex-col items-center justify-center space-y-4 ${
                  isDragging
                    ? 'border-gold bg-gold/10 scale-[1.01]'
                    : 'border-gold/30 hover:border-gold/60 bg-midnight-900/50 hover:bg-midnight-900/80'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFile(e.target.files[0]);
                    }
                  }}
                />

                {/* Animated Diya or Cloud Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-gold/20 to-festive-orange/20 border border-gold/30 flex items-center justify-center text-gold shadow-glow-gold">
                  <UploadCloud className="w-8 h-8 animate-bounce" />
                </div>

                <div className="space-y-1">
                  <p className="text-base font-semibold text-white">
                    Drag and drop your room photo here
                  </p>
                  <p className="text-xs text-festive-cream/60">
                    or <span className="text-gold underline font-semibold">browse computer</span>
                  </p>
                </div>

                {isUploading && (
                  <div className="w-full max-w-xs space-y-1.5 pt-2">
                    <div className="flex justify-between text-[11px] text-gold-warm">
                      <span>Uploading room...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-midnight-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gold to-festive-orange transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons to Continue */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleContinueToStudio}
                className="py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-gold via-gold-warm to-festive-orange text-midnight-950 shadow-glow-gold hover:shadow-glow-gold-lg transition-all flex items-center justify-center space-x-2"
              >
                <Brush className="w-4 h-4" />
                <span>Open in Decoration Studio</span>
              </button>
              <button
                onClick={handleContinueToAI}
                className="py-3 px-4 rounded-xl font-semibold text-xs glass-card border border-gold/30 text-festive-cream hover:text-white hover:border-gold flex items-center justify-center space-x-2"
              >
                <Bot className="w-4 h-4 text-gold" />
                <span>Use AI Decorator</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Instant Sample Rooms Selection */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl glass-card p-5 border border-gold/25 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-serif font-bold text-white flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Try Sample Rooms</span>
                </h3>
                <p className="text-[11px] text-festive-cream/70 mt-0.5">
                  No photo on hand? Pick one of our curated architectural spaces.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-[580px] overflow-y-auto pr-1">
              {SAMPLE_ROOMS.map((room) => {
                const isSelected = previewUrl === room.image;
                return (
                  <div
                    key={room.id}
                    onClick={() => handleSelectSample(room)}
                    className={`group cursor-pointer rounded-xl overflow-hidden border transition-all relative ${
                      isSelected
                        ? 'border-gold shadow-glow-gold ring-2 ring-gold/40'
                        : 'border-gold/20 hover:border-gold/50'
                    }`}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-[11px] font-semibold text-white truncate">
                          {room.name}
                        </p>
                        <p className="text-[9px] text-gold-warm truncate">{room.category}</p>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gold text-midnight-950 flex items-center justify-center font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
