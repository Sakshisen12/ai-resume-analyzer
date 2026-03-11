import jwt from 'jsonwebtoken';
import { AppError } from './error.js';
import { config } from '../config/env.js';
import User from '../models/User.js';
export const protect = async (req, res, next) => {
    try {
        // 1) Getting token and check of it's there
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return next(new AppError('You are not logged in! Please log in to get access.', 401));
        }
        // 2) Verification token
        const decoded = jwt.verify(token, config.jwtSecret);
        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return next(new AppError('The user belonging to this token no longer exists.', 401));
        }
        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser;
        next();
    }
    catch (error) {
        next(new AppError('Invalid token. Please log in again!', 401));
    }
};
//# sourceMappingURL=auth.js.map