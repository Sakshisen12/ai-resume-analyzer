import Resume from '../models/Resume.js';
import JobMatch from '../models/JobMatch.js';
import * as aiService from '../services/ai.service.js';
import { AppError } from '../middleware/error.js';
export const matchJob = async (req, res, next) => {
    try {
        const { resumeId, jobDescription } = req.body;
        if (!resumeId || !jobDescription) {
            return next(new AppError('Please provide both resumeId and jobDescription', 400));
        }
        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return next(new AppError('Resume not found', 404));
        }
        // Auth check
        if (resume.userId.toString() !== req.user._id.toString()) {
            return next(new AppError('You do not have permission to use this resume', 403));
        }
        const matchResults = await aiService.matchJobDescription(resume.parsedText, jobDescription);
        const jobMatch = await JobMatch.create({
            userId: req.user._id,
            resumeId,
            jobDescription,
            matchScore: matchResults.matchScore,
            missingKeywords: matchResults.missingKeywords,
            skillGapAnalysis: matchResults.skillGapAnalysis,
            recommendations: matchResults.recommendations,
        });
        res.status(201).json({
            status: 'success',
            data: {
                jobMatch,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
export const getJobMatchHistory = async (req, res, next) => {
    try {
        const history = await JobMatch.find({ userId: req.user._id })
            .populate('resumeId', 'filename')
            .sort('-createdAt');
        res.status(200).json({
            status: 'success',
            results: history.length,
            data: {
                history,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=job.controller.js.map