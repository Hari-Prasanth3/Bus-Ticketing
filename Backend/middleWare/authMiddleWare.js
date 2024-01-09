import jwt from 'jsonwebtoken';
import asyncHandler from "../middleWare/asyncHandler.js";
import User from '../models/userModel.js';

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized, token failed')
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token')
    }
})

// Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin){
        next();
    } else {
        res.status(401).json({
            message: 'Not authorized as admin'
        })
    }
};
// Get user Id
const userId = (req) => {
    const token = req.cookies.jwt;

    if (!token) {
        return null;
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken.userId;
    } catch (error) {
        console.log('Error verifying JWT:', error);
        return null;
    }
};

export { protect, admin,userId };