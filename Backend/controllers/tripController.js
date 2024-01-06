import Trip from '../models/tripModel.js';
import { addTrip } from '../services/tripService.js';

const createTrip = async (req,res) => {
    const {
        busNumber,
        availableSeats,
        date,
        departureTime,
        arrivalTime,
        origin,
        destination,
        price
    } = req.body
	try {
		const existingTrip = await Trip.findOne({
            $and: [
                {date: date},
                {departureTime: {$lte: arrivalTime}},
                {arrivalTime: {$gte: departureTime}}
            ]
        });
		if(existingTrip){
			return res.status(400).json({message: "Trip already exists"})
		}

        const trip = await addTrip(
            busNumber,
            availableSeats,
            date,
            departureTime,
            arrivalTime,
            origin,
            destination,
            price
        )
		return res.status(200).json({
            busNumber: trip.busNumber,
            availableSeats: trip.availableSeats,
            date: trip.date,
            departureTime: trip.departureTime,
            arrivalTime: trip.arrivalTime,
            origin: trip.origin,
            destination: trip.destination,
            price: trip.price
        })
	} catch(error) {
		return res.status(500).json({ 
            message: error.message 
        })
	}
}

export { createTrip }