import Trip from '../models/tripModel.js';
import { addTrip,getTrip } from '../services/tripService.js';

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
                busNumber: busNumber,
                date: date,
        });
		if(existingTrip){
			return res.status(400).json({message: "Trip already exists"})
		} else {
            console.log("hello")
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

const getTripById = async (req, res) => {
	try {
		const trip = await getTrip(req.params.id );

		if (trip) {
            return res.status(200).json(trip)
        } else {
            return res.status(404).json({ message: 'Trip not found' });
        }
	} catch (error) {
		console.error(error.message);
		res.status(500).json({message: "Invalid Trip ID"});
	}
};

const SearchBus = async (req,res) => {
    let origin = req.query.from;
    let destination = req.query.to;
    let date = req.query.date;

    if (!origin || !destination || !date) {
        return res.status(400).json({ error: "Invalid parameters" });
    }

    const trip = await Trip.find({
        origin: origin,
        destination: destination,
        date: date
    })
console.log(trip);
    if (!trip.length) {
        return res.status(404).json({ error: "No available buses" });
    } else {
        return res.status(200).json(trip)
    }
}


export { createTrip, SearchBus,getTripById}