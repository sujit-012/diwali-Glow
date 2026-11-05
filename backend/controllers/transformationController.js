import Transformation from '../models/Transformation.js';

// @desc    Record a new transformation (manual or AI)
// @route   POST /api/transformations
// @access  Public (optional auth)
export const saveTransformation = async (req, res) => {
  try {
    const {
      projectId,
      originalImage,
      transformedImage,
      decorationElements,
      transformationType,
      theme,
      intensity,
      prompt,
    } = req.body;

    if (!originalImage || !transformedImage) {
      return res.status(400).json({
        success: false,
        message: 'Both original and transformed room images are required',
      });
    }

    const transformation = await Transformation.create({
      projectId: projectId || null,
      userId: req.user ? req.user._id : null,
      originalImage,
      transformedImage,
      decorationElements: decorationElements || [],
      transformationType: transformationType || 'manual',
      theme: theme || 'Traditional Diwali',
      intensity: intensity || 75,
      prompt: prompt || '',
    });

    res.status(201).json({ success: true, transformation });
  } catch (error) {
    console.error('Error saving transformation:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get transformations for a specific project
// @route   GET /api/transformations/:projectId
// @access  Public (optional auth)
export const getTransformationsByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const transformations = await Transformation.find({ projectId }).sort({ createdAt: -1 });

    res.json({ success: true, count: transformations.length, transformations });
  } catch (error) {
    console.error('Error fetching transformations:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
