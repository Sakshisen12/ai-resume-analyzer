import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
  userId: mongoose.Types.ObjectId;
  filename: string;
  filePath: string;
  parsedText: string;
  uploadDate: Date;
}

const resumeSchema = new Schema<IResume>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Resume must belong to a user'],
    },
    filename: {
      type: String,
      required: [true, 'Resume must have a filename'],
    },
    filePath: {
      type: String,
      required: [true, 'Resume must have a file path'],
    },
    parsedText: {
      type: String,
      default: '',
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IResume>('Resume', resumeSchema);
