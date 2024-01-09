import express from 'express';
import { authUser, registerUser, getUserById } from '../controllers/userController.js';
import {protect, admin} from '../middleWare/authMiddleWare.js'

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser)
router.get('/:id',getUserById)


export default router
