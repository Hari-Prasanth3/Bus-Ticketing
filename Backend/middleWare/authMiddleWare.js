import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Ticket from '../models/ticketModel.js';

// Protect routes
const protect = (async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({message:'Not authorized, token failed'})
        }
    } else {
        res.status(401).json({message:'Not authorized, no token'})
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
// const userId = (req) => {
//     const token = req.cookies.jwt;

//     if (!token) {
//         return null;
//     }

//     try {
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//         return decodedToken.userId;
//     } catch (error) {
//         console.log('Error verifying JWT:', error);
//         return null;
//     }
// };
// Get User
const checkUser = async(req,res,next) => {
    const user_id = req.user._id
    const id = req.params.id
    // console.log(user_id, id)
    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                message: 'User Not Found'
            })
        }
        if(user_id.toString() === id){
            next();
        } else {
            return res.status(404).json({
                message: "User ID Not Found"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: 'Invalid User ID'
        })
    }
}
//get check Auth
const checkAuthUser = async (req, res, next) => {
    const user_id = req.user._id;
    const ticket = req.params.id;
    // console.log('user_id:', user_id);
    // console.log('ticket:', ticket);
    try {
      const tickets = await Ticket.findById(ticket);
      if (!tickets) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      if (tickets.user_id.toString() !== user_id.toString()) {
        return res.status(404).json({ message: 'User ticket not found' });
      } else {
        next();
      }
    } catch (error) {
      return res.status(404).json({ message: 'Invalid Ticket Id' });
    }
  };
export { protect, admin ,checkUser,checkAuthUser};