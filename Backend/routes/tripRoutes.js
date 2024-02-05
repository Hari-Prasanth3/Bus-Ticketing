import express from 'express';
import { protect, admin } from '../middleWare/authMiddleWare.js';
import { checkBusOwner, checkTripSeat } from '../middleWare/busMiddleWare.js';
import { searchValidation,tripValidation } from '../middleWare/validateMiddleWare.js';
import { createTrip,SearchBus,getTripById } from '../controllers/tripController.js';

const router = express.Router();

router.post('/trip',
 protect,
 admin,
 tripValidation,
 checkBusOwner,
 checkTripSeat,
 createTrip)

router.get('/search',
 searchValidation,
 SearchBus)

 router.get('/:id',getTripById)
export default router