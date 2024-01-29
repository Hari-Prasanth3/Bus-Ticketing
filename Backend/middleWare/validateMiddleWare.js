import Joi from 'joi';
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

const searchValidation = (data) => {
    const schema = Joi.object({
        from : Joi.string().required(),
        to : Joi.string().required(),
        date : Joi.date().required()
    });
    return schema.validate(data)
}

const tripValidation = (data) => {
    const schema = Joi.object({
        busNumber : Joi.string().required(),
        availableSeats : Joi.number().required(),
        date : Joi.date().required(),
        departureTime : Joi.string().required(),
        arrivalTime : Joi.string().required(),
        origin : Joi.string().required(),
        destination : Joi.string().required(),
        price : Joi.number().integer().required()
    });
    return schema.validate(data)
}



export { ticketValidation, searchValidation, tripValidation, loginValidation, registerValidation }