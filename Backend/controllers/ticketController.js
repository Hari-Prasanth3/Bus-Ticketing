import { UpdateTrip, cancel, checkSeats, createTicket, findTicket, findTrip, getTickets, update } from '../services/ticketService.js';

const BookTrip = async (req, res) => {
    const { passengers} = req.body;
    const { trip_id } = req.params;

    try {
        const trip = await findTrip(trip_id);

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        const user_id = req.user
        const busNumber = trip.busNumber;
        const bookingDate = new Date;
        const numberOfSeats = passengers.length;
        const date = trip.date;
        const departureTime = trip.departureTime;
        const arrivalTime = trip.arrivalTime;
        const origin = trip.origin;
        const destination = trip.destination;
        const totalPrice = passengers.length * trip.price;

        const seatNumbers = passengers.map(passenger => passenger.seatNo);
        

        const seatExists = await checkSeats(trip_id, seatNumbers)

        if (seatExists) {
            return res.status(400).json({ message: 'Seat already booked' });
        }
        
        // const user_id = req.user._id
        const ticket = await createTicket(user_id, trip_id, busNumber, bookingDate, passengers, numberOfSeats, date, departureTime, arrivalTime, origin, destination, totalPrice,)
        
        const updateTrip = await UpdateTrip(trip_id, numberOfSeats, seatNumbers);
    
        if (!updateTrip) {
            return res.status(500).json({ message: 'Cannot to update trip' });
        }

        res.status(200).json({ 
            ticket_id : ticket._id,
            user_id : ticket.user_id,
            trip_id : ticket.trip_id,
            busNumber : ticket.busNumber,
            bookingDate : ticket.bookingDate,
            passengers : ticket.passengers,
            numberOfSeats : ticket.numberOfSeats,
            date : ticket.date,
            departureTime : ticket.departureTime,
            arrivalTime : ticket.arrivalTime,
            origin : ticket.origin,
            destination : ticket.destination,
            totalPrice : ticket.totalPrice
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message : "Invalid Trip ID" })
    } 
}

const getTicketById = async (req, res) => {
	try {
        const ticket = await findTicket(req.params.id)

		if (ticket) {
            return res.status(200).json(ticket);
        } else {
            return res.status(404).json({ message: 'Tickets not found' });
        }
		
	} catch (err) {
		console.error(err.message);
		res.status(500).json({
            message: "Invalid Ticket ID"
        });
	}
};

const getAllTickets = async (req, res) => {
    try {

        const user_id = req.user

        const tickets = await getTickets(user_id)
        // console.log(tickets);

		if (!tickets.length) {
            return res.status(404).json({ message: 'Tickets not found' });
        } else {
            return res.status(200).json(tickets)
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: err.message
        });
    }
};

const cancelTicket = async (req, res) => {

    try {
        const ticket = await cancel(req.params.id)
        console.log(ticket);

        if(ticket){
            const seatNumbers = ticket.passengers
            const seatNo = seatNumbers.map(passenger => passenger.seatNo);
            if(!ticket.isBooked){
                return res.status(400).json({
                    message: "Ticket Already Canceled"
                })
            }

            const trip = await update(ticket.trip_id, ticket.numberOfSeats, seatNo)
            console.log(trip);

            if(!trip) {
            return res.status(404).json({
                    message: "Trip Not Found"
                })
            }
            ticket.isBooked = false
            await ticket.save();
            return res.status(200).json(ticket)
        } else {
            return res.status(404).json({
                message: "Ticket Not Found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Invalid Ticket ID"
        })
    }

    
}

export { BookTrip, getTicketById, getAllTickets, cancelTicket }