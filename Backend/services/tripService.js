import Trip from '../models/tripModel.js';

const addTrip = async (
        busNumber,
        availableSeats,
        date,
        departureTime,
        arrivalTime,
        origin,
        destination,
        price
) => {
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

export { addTrip }
