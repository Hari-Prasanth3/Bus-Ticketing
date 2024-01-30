import mongoose from "mongoose";



const tripSchema = new mongoose.Schema({
    // trip_Id: {
    //     type: String,
    //     required: true,
    //  },
    busNumber: {
        type: String,
        required: true,
    },
    availableSeats: {
        type: Number,
        required: true,
    },
    bookedSeats: [{type: Number}],
    date: {
        type: Date,
        required: true
    },
   
    origin: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    departureTime: {
        type: String,
        required: true,
    },
    arrivalTime: {
        type: String,
        required: true,
    },
    // date: {
    //     type: Date,
    //     required: true,
    // },
    price: {
        type: Number,
        required: true,
    }
},{
    timestamps: true
});

const Trip = mongoose.model("Trip", tripSchema);

export default Trip