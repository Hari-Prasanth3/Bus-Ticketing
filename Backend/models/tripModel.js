import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
   seatNo: {
    type: Number,
    required: true,
   },
},{
    timestamps: true,
});

const tripSchema = new mongoose.Schema({
    //tripID primary key
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    //busID Foreign key
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Bus"
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
    date: {
        type:Date,
        required: true,
    },
    departureTime: {
        type: Date,
        required: true,
    },
    arrivalTime: {
        type: Date,
        required: true,
    },
},{
    timestamps: true
});

const Trip = mongoose.model("Trip", tripSchema);

export default Trip