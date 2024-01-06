import express from 'express';
import { protect, admin } from '../middleWare/authMiddleWare.js';
import { checkBusOwner } from '../middleWare/busMiddleWare.js';
import { createTrip } from '../controllers/tripController.js';

const router = express.Router();

router.post('/trip', protect, admin, checkBusOwner, createTrip)

export default router