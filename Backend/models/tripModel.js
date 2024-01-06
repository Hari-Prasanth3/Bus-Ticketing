import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
   seatNo: {
    type: Number,
   },
},{
    timestamps: true,
});

const tripSchema = new mongoose.Schema({
    // //tripID primary key
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "User"
    // },
    // //busID Foreign key
    // busId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Bus"
    // },
    busNumber: {
        type: String,
        required: true,
    },
    availableSeats: {
        type: Number,
        required: true,
    },
    bookedSeats: [bookSchema],
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
    date: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
},{
    timestamps: true
});

const Trip = mongoose.model("Trip", tripSchema);

export default Trip