import Resume from '../models/Resume.js';
import { analysisQueue } from '../queues/analysis.queue.js';
import { Job } from 'bullmq';
import { AppError } from '../middleware/error.js';
export const analyzeResume = async (req, res, next) => {
    try {
        const { resumeId } = req.body;
        if (!resumeId) {
            return next(new AppError('Please provide a resume ID', 400));
        }
        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return next(new AppError('Resume not found', 404));
        }
        // Check if the resume belongs to the user
        // req.user is attached by the protect middleware
        if (resume.userId.toString() !== req.user._id.toString()) {
            return next(new AppError('You do not have permission to analyze this resume', 403));
        }
        if (!resume.parsedText) {
            return next(new AppError('Resume has no text to analyze', 400));
        }
        const job = await analysisQueue.add('analyze-resume', {
            resumeId: resume._id,
            userId: req.user._id,
        });
        res.status(202).json({
            status: 'success',
            message: 'Resume analysis started in the background',
            data: {
                jobId: job.id,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
export const getJobStatus = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        if (!jobId) {
            return next(new AppError('Please provide a job ID', 400));
        }
        const job = await Job.fromId(analysisQueue, jobId);
        if (!job) {
            return next(new AppError('Job not found', 404));
        }
        const state = await job.getState();
        const progress = job.progress;
        const result = job.returnvalue;
        const reason = job.failedReason;
        res.status(200).json({
            status: 'success',
            data: {
                jobId: job.id,
                state,
                progress,
                result,
                reason,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=ai.controller.js.map