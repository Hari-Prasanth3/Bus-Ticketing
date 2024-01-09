import express from 'express';
import { BookTrip, getTicketById, getAllTickets, cancelTicket } from '../controllers/ticketController.js'

const router = express.Router();

router.post('/ticket/:trip_id', BookTrip)
router.get('', getAllTickets)
router.route('/:id').get(getTicketById).put(cancelTicket)

export default router