import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
    user_id: {
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
        type: Boolean,
        // required: true,
        default: false
    },
},{
    timestamps: true,

});

const  Bus = mongoose.model("Bus", busSchema);
export default Bus