import express from 'express';
import {protect, admin} from '../middleWare/authMiddleWare.js'
import { createBus } from '../controllers/busController.js';
import { busValidation } from '../middleWare/busMiddleWare.js';

const router = express.Router();

router.post('/bus', protect, admin, busValidation,createBus)

export default router