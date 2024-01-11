
import Bus from '../models/busModel.js';
import Joi from 'joi';

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
				res.status(403).json({ message: "User is not the owner of the Bus"})
			}
		}
	} catch (error) {
        res.status(400).json({ message: error.message})
    }
};

const busValidation = (data) => {
	const busSchema = Joi.object({
		busNumber: Joi.string().required(),
		busSeats: Joi.number().required(),
		isSleeper: Joi.boolean(),
	});
	return busSchema.validate(data)
}



export { checkBusOwner, busValidation }