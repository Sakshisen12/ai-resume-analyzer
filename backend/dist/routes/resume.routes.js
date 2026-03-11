import { Router } from 'express';
import * as resumeController from '../controllers/resume.controller.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
const router = Router();
// All resume routes are protected
router.use(protect);
router.post('/upload', upload.single('resume'), resumeController.uploadResume);
router.get('/', resumeController.getUserResumes);
export default router;
//# sourceMappingURL=resume.routes.js.map