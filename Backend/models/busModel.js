import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    busNumber: {
        type: String,
        required: true,
        unique: true,
    },
    busSeats: {
        type: Number,
        required: true,
    },
    isSleeper: {
        type: String,
        required: true,
        default: false
    },
},{
    timestamps: true,

});

const  Bus = mongoose.model("Bus", busSchema);
export default Bus