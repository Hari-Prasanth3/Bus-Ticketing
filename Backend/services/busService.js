import Bus from "../models/busModel.js";


const newBus = async (user_id, busNumber, busSeats, isSleeper) =>{
    const createNewBus = await Bus.create({
        user_id, busNumber, busSeats, isSleeper
    });
    return createNewBus
}
 export {newBus}