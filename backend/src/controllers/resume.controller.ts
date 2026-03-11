import { Request, Response, NextFunction } from 'express';
import Resume from '../models/Resume.js';
import { extractTextFromPdf } from '../services/resume.service.js';
import { AppError } from '../middleware/error.js';

export const uploadResume = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return next(new AppError('Please upload a resume file', 400));
    }

    const filePath = req.file.path;
    const filename = req.file.filename;

    // Extract text from PDF
    const parsedText = await extractTextFromPdf(filePath);

    // Save to database
    const resume = await Resume.create({
      userId: req.user._id,
      filename,
      filePath,
      parsedText,
    });

    res.status(201).json({
      status: 'success',
      data: {
        resume,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserResumes = async (req: any, res: Response, next: NextFunction) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort('-uploadDate');
    
    res.status(200).json({
      status: 'success',
      results: resumes.length,
      data: {
        resumes,
      },
    });
  } catch (error) {
    next(error);
  }
};
