import { userId } from "../middleWare/authMiddleWare.js";
import Bus from '../models/busModel.js';
import {busValidation} from '../middleWare/busMiddleWare.js'



const addBus = async (user_id, busNumber, busSeats, isSleeper) =>{
    const newBus = await Bus.create({
        user_id, busNumber, busSeats, isSleeper
    });
    return newBus
}
const createBus = async (req, res)=> {
    try {
        const {busNumber, busSeats, isSleeper} = req.body
        const { error } = busValidation(req.body)
        if(error){
            return res.status(400).json({
                message: error.message
            })}


        const user_id = userId(req)

        const bus = await addBus(user_id, busNumber, busSeats, isSleeper)

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


export { createBus, addBus }