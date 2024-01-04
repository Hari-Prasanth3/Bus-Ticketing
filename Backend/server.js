import express  from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from './config/db.js'
connectDB()

const app = express()
//port connection
const port = process.env.PORT || 8000
app.listen(port, ()=> {
    console.log("Listening to " + port);
})



