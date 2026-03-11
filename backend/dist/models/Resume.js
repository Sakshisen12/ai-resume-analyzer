import mongoose, { Schema } from 'mongoose';
const resumeSchema = new Schema({
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
}, { timestamps: true });
export default mongoose.model('Resume', resumeSchema);
//# sourceMappingURL=Resume.js.map