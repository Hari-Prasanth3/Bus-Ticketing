import mongoose from "mongoose";


const ticketSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    busId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Bus"
    },
    tripId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Trip"
    },
    origin: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    seatNumber: {
        type: Number,
        required:  true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    totalPrize: {
        type: Number,
        required: true
    },
},{
    timestamps: true
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket