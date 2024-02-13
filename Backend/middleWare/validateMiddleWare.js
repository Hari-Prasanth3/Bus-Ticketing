import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date'

const Joi = JoiBase.extend(JoiDate)
// Register User
const registerValidation = (req, res, next) => {
    const schema = Joi.object({
       name: Joi.string().required(),
       email: Joi.string().required().email(),
       password: Joi.string().required(),
       isAdmin: Joi.boolean(),
    });
    const { error, value } = schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: error.message
        })
    } else {
        next();
    }
};

// Login User
const loginValidation =  (req, res, next) => {
    const schema = Joi.object({
       email: Joi.string().required().email(),
       password: Joi.string().required(),
    });
    const { error, value } =  schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: error.message
        })
    } else {
        next();
    }
};
const ticketValidation =  (req, res, next) => {
    const schema = Joi.object({
        passengers: Joi.array().items(
           Joi.object({
             name: Joi.string().required(),
             age: Joi.number().required(),
             seatNo: Joi.number().required(),
           })
        ).required(),
    });
    const { error, value } =  schema.validate(req.body)
    if(error){
        return res.status(400).json({
            message: error.message
        })
    } else {
        next();
    }
}
//bus validation
const busValidation = (req, res, next) => {
    const schema = Joi.object({
        busNumber : Joi.string().required(),
        busSeats : Joi.number().required(),
        isSleeper : Joi.boolean()
    })
    const { error, value } = schema.validate(req.body);
    if(error){
        return res.status(404).json({
            message: error.message
        })
    } else {
        next();
    }
}

const searchValidation = (req, res ,next) => {
    const schema = Joi.object({
        from : Joi.string().required(),
        to : Joi.string().required(),
        date : Joi.date().required().format('YYYY-MM-DD')
    });
    const { error, value } = schema.validate(req.query)
    if(error){
        return res.status(400).json({
            message: error.message
        })
    } else {
        next();
    }
}
const tripValidation = (req, res, next) => {
    const schema = Joi.object({
        busNumber : Joi.string().required(),
        availableSeats : Joi.number().required(),
        date : Joi.date().required().format('YYYY-MM-DD'),
        departureTime : Joi.date().format('HH:mm').required(),
        arrivalTime : Joi.date().format('HH:mm').required(),
        origin : Joi.string().required(),
        destination : Joi.string().required(),
        price : Joi.number().integer().required()
    });
    const { error, value } = schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: error.message
        })
    } else {
        next();
    }
}



export { ticketValidation, searchValidation, tripValidation, loginValidation, busValidation,registerValidation }