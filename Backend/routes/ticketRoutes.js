import express from 'express';
import { BookTrip, getTicketById, getAllTickets, cancelTicket } from '../controllers/ticketController.js'
import { checkAuthUser } from '../middleWare/authMiddleWare.js';

const router = express.Router();

router.post('/ticket/:trip_id', BookTrip)
router.get('', getAllTickets)
router.route('/:id').get(checkAuthUser, getTicketById).put(checkAuthUser,cancelTicket)

export default router