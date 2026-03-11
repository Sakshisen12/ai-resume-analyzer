import { Router } from 'express';
import * as historyController from '../controllers/history.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.get('/', historyController.getHistory);
router.get('/resume/:resumeId', historyController.getResumeHistory);
router.get('/compare', historyController.compareAnalyses);

export default router;
