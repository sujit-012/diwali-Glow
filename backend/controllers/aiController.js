import { aiService } from '../services/aiTransformationService.js';

// @desc    Get AI Provider availability status
// @route   GET /api/ai/status
// @access  Public
export const getAIStatus = async (req, res) => {
  try {
    const status = aiService.getProviderStatus();
    res.json({ success: true, ...status });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Generate AI room transformation
// @route   POST /api/ai/transform
// @access  Public (optional auth)
export const transformRoomAI = async (req, res) => {
  try {
    const { imagePath, theme, intensity, prompt, geminiApiKey } = req.body;

    if (!imagePath) {
      return res.status(400).json({ success: false, message: 'Room image path or URL is required' });
    }

    const result = await aiService.transformRoom({
      imagePath,
      theme,
      intensity: Number(intensity) || 75,
      prompt,
      geminiApiKey: geminiApiKey || '',
    });

    res.json({ success: true, result });
  } catch (error) {
    console.error('AI Transformation Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
