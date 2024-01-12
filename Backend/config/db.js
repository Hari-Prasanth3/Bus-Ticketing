import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const connect =await mongoose.connect(process.env.MONGO_URI,{
            // useUnifiedTopology: true,
           serverSelectionTimeoutMS: 5000
        });
        console.log(`MongoDB Connected : ${connect.connection.host}`);
    }catch (error) {
        console.log(`error : ${error.message}`);
    }
}
export default connectDB