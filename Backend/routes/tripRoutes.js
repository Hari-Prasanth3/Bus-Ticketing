import express from 'express';
import { protect, admin } from '../middleWare/authMiddleWare.js';
import { checkBusOwner } from '../middleWare/busMiddleWare.js';
import { tripValidation } from '../middleWare/validateMiddleWare.js';
import { createTrip,SearchBus,getTripById } from '../controllers/tripController.js';

const router = express.Router();

router.post('/trip', protect, admin, tripValidation,checkBusOwner, createTrip)
router.get('/search', SearchBus)
router.get('/:id',getTripById)
export default router