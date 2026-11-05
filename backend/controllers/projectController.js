import Project from '../models/Project.js';

// @desc    Create a new room decoration project
// @route   POST /api/projects
// @access  Private
export const createProject = async (req, res) => {
  try {
    const { projectName, roomType, originalImage, selectedTheme, canvasState, previewImage, decorationsCount } = req.body;

    let imageUrl = originalImage;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    if (!imageUrl) {
      return res.status(400).json({ success: false, message: 'Please provide or upload a room photograph' });
    }

    const project = await Project.create({
      userId: req.user._id,
      projectName: projectName || 'Festive Diwali Room',
      roomType: roomType || 'Living Room',
      originalImage: imageUrl,
      selectedTheme: selectedTheme || 'Traditional Diwali',
      canvasState: canvasState ? (typeof canvasState === 'string' ? JSON.parse(canvasState) : canvasState) : null,
      previewImage: previewImage || imageUrl,
      decorationsCount: decorationsCount || 0,
    });

    res.status(201).json({ success: true, project });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all projects for current user
// @route   GET /api/projects
// @access  Private
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.json({ success: true, count: projects.length, projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Private
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, project });
  } catch (error) {
    console.error('Error getting project:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update project design / canvas state
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req, res) => {
  try {
    const { projectName, roomType, selectedTheme, canvasState, previewImage, decorationsCount } = req.body;

    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (projectName) project.projectName = projectName;
    if (roomType) project.roomType = roomType;
    if (selectedTheme) project.selectedTheme = selectedTheme;
    if (canvasState !== undefined) {
      project.canvasState = typeof canvasState === 'string' ? JSON.parse(canvasState) : canvasState;
    }
    if (previewImage) project.previewImage = previewImage;
    if (decorationsCount !== undefined) project.decorationsCount = decorationsCount;

    const updatedProject = await project.save();
    res.json({ success: true, project: updatedProject });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, message: 'Project successfully deleted' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
