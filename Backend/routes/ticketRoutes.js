import express from 'express';
import { BookTrip, getTicketById, getAllTickets, cancelTicket } from '../controllers/ticketController.js'
import { checkAuthUser } from '../middleWare/authMiddleWare.js';
import { ticketValidation } from '../middleWare/validateMiddleWare.js';

const router = express.Router();

router.post('/ticket/:trip_id',ticketValidation, BookTrip)
router.get('', getAllTickets)
router.route('/:id').get(checkAuthUser, getTicketById).put(checkAuthUser,cancelTicket)

export default router