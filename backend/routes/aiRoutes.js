import express from 'express';
import { getAIStatus, transformRoomAI } from '../controllers/aiController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/status', getAIStatus);
router.post('/transform', optionalAuth, transformRoomAI);

export default router;
