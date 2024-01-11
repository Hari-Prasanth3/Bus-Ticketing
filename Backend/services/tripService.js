import Trip from '../models/tripModel.js';

const addTrip = async (
        busNumber,
        availableSeats,
        date,
        departureTime,
        arrivalTime,
        origin,
        destination,
        price) => {
    const newTrip = await Trip.create({
        busNumber,
        availableSeats,
        date,
        departureTime,
        arrivalTime,
        origin,
        destination,
        price
    });
    return newTrip
}
// const getTrip = async(trip_Id) => {
//     const trip = await Trip.findById(trip_Id)
//     console.log(trip);
//     return trip

// }
const getTrip = async (trip_Id) => {
    const trip = await Trip.findById({ trip_Id });
    return trip
  }
export { addTrip,getTrip }
