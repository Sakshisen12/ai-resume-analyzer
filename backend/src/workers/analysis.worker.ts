import { Worker, Job } from 'bullmq';
import { redisConnection } from '../config/redis.js';
import * as aiService from '../services/ai.service.js';
import Analysis from '../models/Analysis.js';
import Resume from '../models/Resume.js';

export const analysisWorker = new Worker(
  'analysis',
  async (job: Job) => {
    const { resumeId, userId } = job.data;
    console.log(`Processing analysis for resume: ${resumeId}`);

    try {
      const resume = await Resume.findById(resumeId);
      if (!resume || !resume.parsedText) {
        throw new Error('Resume or parsed text not found');
      }

      const analysisResult = await aiService.analyzeResume(resume.parsedText);

      await Analysis.create({
        userId,
        resumeId,
        ...analysisResult,
      });

      console.log(`Successfully analyzed resume: ${resumeId}`);
      return analysisResult;
    } catch (error) {
      console.error(`Error processing job ${job.id}:`, error);
      throw error;
    }
  },
  {
    connection: redisConnection,
    concurrency: 5,
  }
);

analysisWorker.on('completed', (job) => {
  console.log(`Job ${job.id} has completed!`);
});

analysisWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} has failed with ${err.message}`);
});
