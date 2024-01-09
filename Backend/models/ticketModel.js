import mongoose from 'mongoose';

const passengerSchema = mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    seatNo: {
        type: Number,
    }
})

const ticketSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        rel: "User"
    },
    trip_id: {
        type: String,
        required: true,
        rel: "Trip"
    },
    busNumber: {
        type: String,
        required: true,
        rel: "Bus"
    },
    bookingDate: {
        type: Date,
        required: true
    },
    passengers: [passengerSchema],
    numberOfSeats: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;