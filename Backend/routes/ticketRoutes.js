import express from 'express';
import { BookTrip, getTicketById, getAllTickets, cancelTicket } from '../controllers/ticketController.js'
import {protect, checkAuthUser } from '../middleWare/authMiddleWare.js';
import { sameSeatNo,checkAvailableSeatNos } from '../middleWare/busMiddleWare.js';
import { ticketValidation } from '../middleWare/validateMiddleWare.js';

const router = express.Router();

router.post('/ticket/:trip_id',
                             protect,
                             ticketValidation,
                             sameSeatNo,
                             checkAvailableSeatNos,
                              BookTrip)

router.get('',
             protect,
              getAllTickets)

router.route('/:id').get(
                       protect,checkAuthUser, getTicketById)
                       .put(protect,checkAuthUser,cancelTicket)

export default router