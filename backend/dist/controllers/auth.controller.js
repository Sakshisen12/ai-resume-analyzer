import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AppError } from '../middleware/error.js';
import { config } from '../config/env.js';
const signToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: '30d',
    });
};
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return next(new AppError('User already exists', 400));
        }
        const user = await User.create({
            name,
            email,
            password,
        });
        const token = signToken(user._id.toString());
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
        });
    }
    catch (error) {
        next(error);
    }
};
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new AppError('Please provide email and password', 400));
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            return next(new AppError('Incorrect email or password', 401));
        }
        const token = signToken(user._id.toString());
        res.status(200).json({
            status: 'success',
            token,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=auth.controller.js.map