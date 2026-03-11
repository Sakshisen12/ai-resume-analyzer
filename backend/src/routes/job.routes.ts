import { Router } from 'express';
import * as jobController from '../controllers/job.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.post('/match', jobController.matchJob);
router.get('/history', jobController.getJobMatchHistory);

export default router;
