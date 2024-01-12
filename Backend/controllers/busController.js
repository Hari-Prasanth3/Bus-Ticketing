import asyncHandler from "../middleWare/asyncHandler.js";
// import { addBus, checkBusExists } from '../services/busService.js';
import Bus from '../models/busModel.js';
import { userId } from "../middleWare/authMiddleWare.js";
import { busValidation } from "../middleWare/busMiddleWare.js";
const createBus = asyncHandler(async (req, res)=> {
    try {
        const {busNumber, busSeats, isSleeper} = req.body
        const { error } = busValidation(req.body)
        if(error){
         return res.status(400).json({
             message: error.message
         })
        }
     const checkBus = await checkBusExists(busNumber)
        if(checkBus){
            return res.status(400).json({
                message: "Bus already Exists"
            })
        }

        const user_id = userId(req)
console.log(user_id);
        const bus = await addBus(user_id, busNumber, busSeats, isSleeper)

        res.status(200).json({
            user_id: bus.user_id,
            busNumber: bus.busNumber,
            busSeats: bus.busSeats,
            isSleeper: bus.isSleeper
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
const addBus = async (user_id, busNumber, busSeats, isSleeper) =>{
    const newBus = await Bus.create({
        user_id, busNumber, busSeats, isSleeper
    });
    return newBus
}

const checkBusExists = async (busNumber) => {
    const bus = await Bus.findOne({busNumber});
    return bus
}

export { createBus,addBus, checkBusExists}