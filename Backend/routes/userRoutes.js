import express from 'express';
import { authUser, registerUser, getUserById } from '../controllers/userController.js';
import { checkUser } from '../middleWare/authMiddleWare.js';
import { loginValidation,registerValidation } from '../middleWare/validateMiddleWare.js';
const router = express.Router();

router.post('/login',loginValidation, authUser);
router.post('/register', registerValidation,registerUser)
router.get('/:id',checkUser,getUserById)


export default router
