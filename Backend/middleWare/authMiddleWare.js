import jwt from 'jsonwebtoken';
import asyncHandler from "../middleWare/asyncHandler.js";
import User from '../models/userModel.js';
import Ticket from '../models/ticketModel.js';

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
// Get User
const checkUser = (req,res,next) => {
    const user_id = userId(req)
    const id = req.params.id
    console.log(user_id, id)
    if(id === user_id){
        next();
    } else {
        return res.status(404).json({
            message: "User ID Not Found"
        })
    }
}
//get check Auth
const checkAuthUser = async(req,res,next) => {
    const user_id = userId(req)
    const ticket = req.params.id

    try {
        const tickets = await Ticket.findById(ticket)
        
        if(!tickets){
            return res.status(404).json({message: "Ticket not found"})
        }
        if(tickets.user_id != user_id){
            return res.status(404).json({message: "User ticket not found"})
        } else {
            next();
        }
    } catch (error) {
        return res.status(404).json({message: "Invalid Ticket Id"})
    }
}
export { protect, admin,userId ,checkUser,checkAuthUser};