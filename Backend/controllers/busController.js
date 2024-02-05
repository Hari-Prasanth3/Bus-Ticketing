import {newBus} from '../services/busService.js';


const createBus = async (req, res)=> {
    try {
    const {busNumber, busSeats,isSleeper} = req.body
        const user_id = req.user._id
        // console.log(user_id);

        const bus = await newBus(user_id, busNumber, busSeats, isSleeper)

        res.status(200).json({
            user_id: bus.user_id,
            busNumber: bus.busNumber,
            busSeats: bus.busSeats,
            isSleeper: bus.isSleeper
        })
        
    } catch (error) {
        res.status(500).json({ message: "Bus already Exists" })
    }
}


export { createBus }