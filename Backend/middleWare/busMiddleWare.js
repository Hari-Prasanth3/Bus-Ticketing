import Bus from '../models/busModel.js';
import Trip from '../models/tripModel.js';

const checkBusOwner = async (req, res, next) => {
	try{
		const bus = await Bus.findOne({busNumber: req.body.busNumber});

		if(!bus) {
			res.status(404).json({ message : "Bus not found"});
		} else {
            console.log(bus)
			if (req.user && req.user._id.toString() === bus.user_id.toString()){
				next();
			} else {
				res.status(403).json({ message: "User is not the owner of Bus"})
			}
		}
	} catch (error) {
        res.status(400).json({ message: error.message})
    }
};


//check availableSeats(createTrip) === busSeats(createBus)
const checkTripSeat = async (req,res,next) => {
	const { busNumber, availableSeats } = req.body;
	const bus = await Bus.findOne({busNumber})

	if(bus.busSeats < availableSeats){
		return res.status(404).json({
			message: `Available Seats is not Equal to ${bus.busSeats}`
		})
	}
	next();
}
//if user book same seatNo for another passenger
const sameSeatNo = (req,res,next) => {
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
// select seats for book ticket === available seats(create atrip)
const checkAvailableSeatNos = async (req,res,next) => {
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





export { checkBusOwner, checkAvailableSeatNos,sameSeatNo,checkTripSeat } 