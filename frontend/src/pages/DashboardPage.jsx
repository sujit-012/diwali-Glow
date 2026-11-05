import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useProject } from '../context/ProjectContext';
import { api } from '../services/api';
import { DiyaFlame } from '../components/common/DiyaFlame';
import toast from 'react-hot-toast';
import {
  LayoutDashboard,
  Plus,
  Brush,
  Trash2,
  Calendar,
  Sparkles,
  Layers,
  User as UserIcon,
  FolderOpen,
  ArrowRight,
  Eye,
} from 'lucide-react';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const { selectRoom, applyTheme, setCurrentProjectId, setProjectName, setComparisonResult } =
    useProject();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from MongoDB API
  useEffect(() => {
    const fetchProjects = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.getProjects();
        if (res.success && res.projects) {
          setProjects(res.projects);
        }
      } catch (err) {
        console.warn('Error fetching saved projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [isAuthenticated]);

  const handleDeleteProject = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this design?')) {
      try {
        const res = await api.deleteProject(id);
        if (res.success) {
          setProjects((prev) => prev.filter((p) => p._id !== id));
          toast.success('Design deleted');
        } else {
          toast.error(res.message || 'Failed to delete');
        }
      } catch (err) {
        toast.error('Network error deleting project');
      }
    }
  };

  const handleEditProject = (project) => {
    selectRoom(project.originalImage, project.roomType, project.projectName);
    applyTheme(project.selectedTheme);
    setCurrentProjectId(project._id);
    setProjectName(project.projectName);
    navigate('/studio');
  };

  const handleCompareProject = (project) => {
    setComparisonResult({
      originalImage: project.originalImage,
      transformedImage: project.previewImage || project.originalImage,
      theme: project.selectedTheme,
      title: project.projectName,
      decorationsCount: project.decorationsCount || 0,
    });
    navigate('/comparison');
  };

  const handleCreateNew = () => {
    setCurrentProjectId(null);
    navigate('/upload');
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Top Banner */}
      <div className="rounded-3xl glass-panel-elevated p-6 sm:p-10 border border-gold/30 shadow-2xl mb-10 relative overflow-hidden">
        {/* Ambient Gradient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-festive-orange/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-gold to-festive-orange text-midnight-950 flex items-center justify-center font-serif text-2xl font-black shadow-glow-gold">
              {user?.name ? user.name[0].toUpperCase() : <DiyaFlame size="md" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gold-warm font-semibold uppercase tracking-wider">
                  Diwali Studio Workspace
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Namaste, <span className="text-gold-gradient">{user?.name || 'Festive Creator'}!</span>
              </h1>
              <p className="text-xs text-festive-cream/70 mt-1">
                {isAuthenticated
                  ? user?.email
                  : 'Sign in to save and organize your personalized Diwali room designs.'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {!isAuthenticated ? (
              <button
                onClick={() => openAuthModal('login')}
                className="py-3 px-6 rounded-xl font-bold text-xs bg-gradient-to-r from-gold to-festive-orange text-midnight-950 shadow-glow-gold hover:shadow-glow-gold-lg"
              >
                Sign In to Save Designs
              </button>
            ) : (
              <button
                onClick={handleCreateNew}
                className="py-3 px-6 rounded-xl font-bold text-xs bg-gradient-to-r from-gold via-gold-warm to-festive-orange text-midnight-950 shadow-glow-gold hover:shadow-glow-gold-lg transition-all flex items-center space-x-2"
              >
                <Plus className="w-4 h-4 font-bold" />
                <span>Create New Design</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gold/15 text-left">
          <div>
            <p className="text-2xl font-serif font-bold text-gold-warm">
              {isAuthenticated ? projects.length : 0}
            </p>
            <p className="text-[11px] text-festive-cream/60">Total Saved Designs</p>
          </div>
          <div>
            <p className="text-2xl font-serif font-bold text-gold-warm">5</p>
            <p className="text-[11px] text-festive-cream/60">Festive Themes Available</p>
          </div>
          <div>
            <p className="text-2xl font-serif font-bold text-gold-warm">50+</p>
            <p className="text-[11px] text-festive-cream/60">Handcrafted Elements</p>
          </div>
          <div>
            <p className="text-2xl font-serif font-bold text-emerald-400">Online</p>
            <p className="text-[11px] text-festive-cream/60">Cloud Sync Status</p>
          </div>
        </div>
      </div>

      {/* Saved Projects Gallery */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center space-x-2">
              <FolderOpen className="w-5 h-5 text-gold" />
              <span>Saved Projects Gallery</span>
            </h2>
            <p className="text-xs text-festive-cream/70 mt-0.5">
              Revisit and continue decorating your festive spaces anytime.
            </p>
          </div>

          {isAuthenticated && (
            <button
              onClick={handleCreateNew}
              className="text-xs text-gold-warm hover:text-white font-semibold flex items-center space-x-1"
            >
              <span>New Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16 rounded-2xl glass-card border border-gold/15">
            <DiyaFlame size="lg" className="mx-auto mb-3" />
            <p className="text-xs text-gold-warm">Loading your festive gallery...</p>
          </div>
        ) : !isAuthenticated ? (
          /* Guest State */
          <div className="text-center py-14 px-6 rounded-2xl glass-card border border-gold/20 max-w-xl mx-auto space-y-4">
            <DiyaFlame size="lg" className="mx-auto" />
            <h3 className="text-xl font-serif font-bold text-white">
              Sign In to Build Your Design Portfolio
            </h3>
            <p className="text-xs text-festive-cream/70 leading-relaxed">
              When logged in, every room you decorate in the Studio or transform with AI is safely
              saved here for download, edit, or comparison.
            </p>
            <button
              onClick={() => openAuthModal('login')}
              className="py-2.5 px-6 rounded-xl font-bold text-xs bg-gradient-to-r from-gold to-festive-orange text-midnight-950 shadow-glow-gold"
            >
              Sign In Now
            </button>
          </div>
        ) : projects.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 px-6 rounded-2xl glass-card border border-gold/20 max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-gold/15 text-gold flex items-center justify-center mx-auto border border-gold/30">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-serif font-bold text-white">No Saved Designs Yet</h3>
            <p className="text-xs text-festive-cream/70">
              You haven't saved any decorated rooms yet. Pick a room photo and start placing diyas,
              lights, and rangolis!
            </p>
            <button
              onClick={handleCreateNew}
              className="py-2.5 px-5 rounded-xl font-bold text-xs bg-gradient-to-r from-gold to-festive-orange text-midnight-950 shadow-glow-gold"
            >
              Start First Project
            </button>
          </div>
        ) : (
          /* Projects Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project._id}
                whileHover={{ y: -4 }}
                className="rounded-2xl glass-card border border-gold/25 overflow-hidden hover:border-gold/60 transition-all flex flex-col justify-between group shadow-lg"
              >
                {/* Thumbnail Preview */}
                <div
                  onClick={() => handleEditProject(project)}
                  className="relative aspect-[16/10] overflow-hidden cursor-pointer"
                >
                  <img
                    src={project.previewImage || project.originalImage}
                    alt={project.projectName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-midnight-950/80 backdrop-blur-md text-gold-warm border border-gold/30">
                      {project.roomType}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-darkPurple-900/80 text-festive-cream/80 border border-gold/20">
                      {project.decorationsCount || 0} items
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-serif font-bold text-white group-hover:text-gold-warm transition-colors truncate">
                      {project.projectName}
                    </h3>
                    <p className="text-xs text-gold-warm/90 mt-0.5">
                      Theme: {project.selectedTheme}
                    </p>
                    <p className="text-[11px] text-festive-cream/50 mt-1 flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-gold/60" />
                      <span>
                        {new Date(project.updatedAt || project.createdAt).toLocaleDateString(
                          undefined,
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )}
                      </span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-gold/15 flex items-center justify-between">
                    <button
                      onClick={() => handleCompareProject(project)}
                      className="text-xs text-festive-cream/70 hover:text-white flex items-center space-x-1"
                      title="Compare Before & After"
                    >
                      <Eye className="w-3.5 h-3.5 text-gold" />
                      <span>Compare</span>
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-darkPurple-900 border border-gold/30 text-gold-warm hover:bg-gold/20 transition-all flex items-center space-x-1"
                      >
                        <Brush className="w-3 h-3" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={(e) => handleDeleteProject(project._id, e)}
                        className="p-1.5 rounded-lg text-festive-cream/50 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete Design"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
