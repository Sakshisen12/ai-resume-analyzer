import mongoose, { Schema } from 'mongoose';
const analysisSchema = new Schema({
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
}, { timestamps: true });
export default mongoose.model('Analysis', analysisSchema);
//# sourceMappingURL=Analysis.js.map