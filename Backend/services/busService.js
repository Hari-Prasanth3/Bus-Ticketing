import Bus from '../models/busModel.js';

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

export { addBus, checkBusExists }
