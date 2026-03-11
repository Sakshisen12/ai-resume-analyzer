import { Router } from 'express';
import * as aiController from '../controllers/ai.controller.js';
import { protect } from '../middleware/auth.js';
const router = Router();
// Protect all AI routes
router.use(protect);
router.post('/analyze', aiController.analyzeResume);
router.get('/status/:jobId', aiController.getJobStatus);
export default router;
//# sourceMappingURL=ai.routes.js.map