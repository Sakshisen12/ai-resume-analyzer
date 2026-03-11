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
            console.log('Protect middleware: No token found in headers');
            return next(new AppError('You are not logged in! Please log in to get access.', 401));
        }
        // 2) Verification token
        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            console.log('Protect middleware: Token verified for user ID:', decoded.id);
            // 3) Check if user still exists
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                console.log('Protect middleware: User no longer exists for ID:', decoded.id);
                return next(new AppError('The user belonging to this token no longer exists.', 401));
            }
            // GRANT ACCESS TO PROTECTED ROUTE
            req.user = currentUser;
            next();
        }
        catch (err) {
            console.log('Protect middleware: JWT verification failed:', err.message);
            next(new AppError('Invalid token. Please log in again!', 401));
        }
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=auth.js.map