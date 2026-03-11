import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false, // Don't return password by default
    },
}, { timestamps: true });
// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
export default mongoose.model('User', userSchema);
//# sourceMappingURL=User.js.map