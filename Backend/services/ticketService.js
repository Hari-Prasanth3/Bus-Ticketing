import Ticket from "../models/ticketModel.js";
import Trip from "../models/tripModel.js";

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
  // console.log(id);
  const tickets = await Ticket.find({ user_id: id });
  return tickets
}

const cancel = async (id) => {
  const ticket = await Ticket.findById(id);
  // console.log(ticket);
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


export { findTrip, createTicket, checkSeats, UpdateTrip, findTicket, getTickets, cancel, update };