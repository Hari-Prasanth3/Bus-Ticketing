import express from 'express';
import {protect, admin} from '../middleWare/authMiddleWare.js'
import { createBus } from '../controllers/busController.js';

const router = express.Router();

router.post('/bus', protect, admin, createBus)

export default router