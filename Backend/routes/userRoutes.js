import express from 'express';
import { authUser, registerUser } from '../controllers/userController';
import {protect, admin} from '../middleware/authMiddleware'

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser)