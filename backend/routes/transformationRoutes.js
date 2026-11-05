import express from 'express';
import {
  saveTransformation,
  getTransformationsByProject,
} from '../controllers/transformationController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', optionalAuth, saveTransformation);
router.get('/:projectId', optionalAuth, getTransformationsByProject);

export default router;
