import Analysis from '../models/Analysis.js';
import { AppError } from '../middleware/error.js';
export const getHistory = async (req, res, next) => {
    try {
        const history = await Analysis.find({ userId: req.user._id })
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
export const getResumeHistory = async (req, res, next) => {
    try {
        const { resumeId } = req.params;
        const history = await Analysis.find({
            userId: req.user._id,
            resumeId
        }).sort('-createdAt');
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
export const compareAnalyses = async (req, res, next) => {
    try {
        const { analysisId1, analysisId2 } = req.query;
        if (!analysisId1 || !analysisId2) {
            return next(new AppError('Please provide two analysis IDs to compare', 400));
        }
        const analyses = await Analysis.find({
            _id: { $in: [analysisId1, analysisId2] },
            userId: req.user._id
        }).sort('-createdAt');
        if (analyses.length !== 2) {
            return next(new AppError('One or both analyses not found', 404));
        }
        const scoreDiff = analyses[0].resumeScore - analyses[1].resumeScore;
        res.status(200).json({
            status: 'success',
            data: {
                comparison: {
                    versions: analyses,
                    scoreImprovement: scoreDiff,
                },
            },
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=history.controller.js.map