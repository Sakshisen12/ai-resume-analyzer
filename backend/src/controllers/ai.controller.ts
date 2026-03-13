import { Request, Response, NextFunction } from 'express';
import Resume from '../models/Resume.js';
import Analysis from '../models/Analysis.js';
import * as aiService from '../services/ai.service.js';
import { Job } from 'bullmq';
import { analysisQueue } from '../queues/analysis.queue.js';
import { AppError } from '../middleware/error.js';

export const analyzeResume = async (req: Request, res: Response, next: NextFunction) => {
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
    if (resume.userId.toString() !== (req as any).user._id.toString()) {
      return next(new AppError('You do not have permission to analyze this resume', 403));
    }

    if (!resume.parsedText) {
      return next(new AppError('Resume has no text to analyze', 400));
    }

    console.log(`Bypassing BullMQ: Processing AI analysis synchronously for ${resumeId}`);
    
    // Process synchronously to bypass Redis connection issues
    const analysisResult = await aiService.analyzeResume(resume.parsedText);

    const analysis = await Analysis.create({
      userId: (req as any).user._id,
      resumeId: resume._id,
      ...analysisResult,
    });

    res.status(200).json({
      status: 'success',
      message: 'Resume analysis completed',
      data: {
        analysis
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getJobStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return next(new AppError('Please provide a job ID', 400));
    }

    if (!analysisQueue) {
      return next(new AppError('Background queue is not available on this server', 503));
    }
    const job = await (Job as any).fromId(analysisQueue, jobId as string);

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
  } catch (error) {
    next(error);
  }
};
