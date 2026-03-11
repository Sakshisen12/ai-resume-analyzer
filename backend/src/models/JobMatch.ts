import mongoose, { Schema, Document } from 'mongoose';

export interface IJobMatch extends Document {
  userId: mongoose.Types.ObjectId;
  resumeId: mongoose.Types.ObjectId;
  jobDescription: string;
  matchScore: number;
  missingKeywords: string[];
  skillGapAnalysis: string;
  recommendations: string[];
  createdAt: Date;
}

const jobMatchSchema = new Schema<IJobMatch>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Job match must belong to a user'],
    },
    resumeId: {
      type: Schema.Types.ObjectId,
      ref: 'Resume',
      required: [true, 'Job match must be linked to a resume'],
    },
    jobDescription: {
      type: String,
      required: [true, 'Please provide a job description'],
    },
    matchScore: {
      type: Number,
      required: true,
    },
    missingKeywords: {
      type: [String],
      default: [],
    },
    skillGapAnalysis: {
      type: String,
      required: true,
    },
    recommendations: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IJobMatch>('JobMatch', jobMatchSchema);
