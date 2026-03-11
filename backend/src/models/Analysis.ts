import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalysis extends Document {
  userId: mongoose.Types.ObjectId;
  resumeId: mongoose.Types.ObjectId;
  resumeScore: number;
  skillsDetected: string[];
  missingSkills: string[];
  experienceStrength: string;
  atsCompatibilityScore: number;
  improvementSuggestions: string[];
  createdAt: Date;
}

const analysisSchema = new Schema<IAnalysis>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resumeId: {
      type: Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
    },
    resumeScore: {
      type: Number,
      required: true,
    },
    skillsDetected: {
      type: [String],
      default: [],
    },
    missingSkills: {
      type: [String],
      default: [],
    },
    experienceStrength: {
      type: String,
      required: true,
    },
    atsCompatibilityScore: {
      type: Number,
      required: true,
    },
    improvementSuggestions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAnalysis>('Analysis', analysisSchema);
