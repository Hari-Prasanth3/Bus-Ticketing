import Ticket from "../models/ticketModel.js";
import Trip from "../models/tripModel.js";
import Bus from "../models/busModel.js";

const findTrip = async (trip_id) => {
  const trip = await Trip.findById(trip_id);
  return trip;
};

const createTicket = async (
  user_id,
  trip_id,
  busNumber,
  bookingDate,
  passengers,
  numberOfSeats,
  date,
  departureTime,
  arrivalTime,
  origin,
  destination,
  totalPrice
) => {
  const newTicket = await Ticket.create({
    user_id,
    trip_id,
    busNumber,
    bookingDate,
    passengers,
    numberOfSeats,
    date,
    departureTime,
    arrivalTime,
    origin,
    destination,
    totalPrice,
  });
  return newTicket;
};

const checkSeats = async (trip_id, seatNumbers) => {
    const SeatsBooked = await Trip.findOne({ _id: trip_id, bookedSeats: { $in: seatNumbers } });

    return SeatsBooked
}

const UpdateTrip = async (trip_id, numberOfSeats, seatNumbers) => {
    const updatedTrip = await Trip.findOneAndUpdate(
        { _id: trip_id },
        { $inc: { availableSeats: -numberOfSeats }, $push: { bookedSeats: seatNumbers } },
        { new: true }
      );
      return updatedTrip
}

const findTicket = async (id) => {
  const ticket = await Ticket.findById(id);
  return ticket
}

const getTickets = async (id) => {
  console.log(id);
  const tickets = await Ticket.find({ user_id: id });
  return tickets
}

const cancel = async (id) => {
  const ticket = await Ticket.findById(id);
  return ticket
}

const update = async (trip_id, numberOfSeats, seatNo) => {
  const trip = await Trip.findOneAndUpdate(
    { _id: trip_id },
    { $inc: { availableSeats: numberOfSeats }, $pull: { bookedSeats: { $in: seatNo} } },
    { new: true }
  );
  return trip
}
const checkSameSeats = (req,res,next) => {
	const { passengers } = req.body;
	const seats = passengers.map((passenger) => passenger.seatNo) 
	const isSame = new Set(seats).size !== seats.length
	if (isSame){
		return res.status(401).json({
			message: "Seat not available,Select different Seats"
		})
	}
	next();
}
const checkUnavailableSeat = async (req,res,next) => {
	try{
		const { passengers } = req.body
	const id = req.params.trip_id
	const trip = await Trip.findById(id)
	if(!trip){
		return res.status(404).json({
			message: 'Trip Not Found'
		})
	}
	const num = trip.busNumber
	const bus = await Bus.findOne({busNumber: num})
	if(!bus){
		return res.status(404).json({
			message: 'Bus Not Found'
		})
	}
	const seats = passengers.map((p) => p.seatNo)
	const check = seats.map((seat) => bus.busSeats < seat)
	if(check.includes(true)){
		return res.status(404).json({
			message: 'Seats Not Found'
		})
	}
	
	next();
	} catch(error){
		res.status(500).json({
			message: "Invalid Trip Id"
		})
	}
}


export { findTrip, createTicket, checkSeats, UpdateTrip, findTicket, getTickets, cancel, update ,checkUnavailableSeat,checkSameSeats};