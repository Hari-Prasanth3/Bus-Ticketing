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
const searchTrip = async(origin,destination,date)=> {
    console.log(origin, destination, date)
const trip = await Trip.find({
    origin: {$regex: origin, $options : 'i'},
    destination: {$regex: destination, $options: 'i'},
    date: date
})
return trip
}
const checkTrip = async (busNumber, date) => {
    const existingTrip = await Trip.findOne({
        busNumber: busNumber,
        date: date,
    });
    return existingTrip
}

const getTrip = async (trip_Id) => {
    const trip = await Trip.findById( trip_Id );
    return trip
  }
// const getTrip = async (trip_Id) => {
//     const trip = await Trip.findById(trip_Id.toString());
//     return trip;
//   }
export { addTrip,getTrip ,searchTrip,checkTrip}
