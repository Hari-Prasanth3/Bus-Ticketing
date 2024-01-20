import { addTrip, checkTrip, getTrip, searchTrip } from '../services/tripService.js';
import { searchValidation, tripValidation } from '../middleWare/validateMiddleWare.js';
import Trip from '../models/tripModel.js';

const createTrip = async (req,res) => {
    const { error, value } = await tripValidation(req.body)
    if(error){
        return res.status(400).json({
            message : error.message
        })
    }

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
        const existingTrip = await checkTrip(busNumber, date)

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

const getTripById = async (req, res) => {
	try {
        const trip = await getTrip(req.params.id)
        
		if (trip) {
            res.status(200).json(trip)
        } else {
            res.status(404).json({ 
                message: 'Trip not found'
            });
        }
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
            message : "Invalid Trip ID"
        });
	}
};


const SearchBus = async (req,res) => {
    let origin = req.query.from;
    let destination = req.query.to;
    let date = req.query.date;
    const { error, value } = await searchValidation(req.query)
    if(error){
        console.log(error)
        return res.status(401).json({
            message : error.message
        })
    }

    const trip = await searchTrip(origin, destination, date)

    if (!trip.length) {
        return res.status(404).json({ message: "No available buses" });
    } else {
        return res.status(200).json(trip)
    }
}

export { createTrip, getTripById, SearchBus }