import express  from "express"
import dotenv from "dotenv"
dotenv.config()

//mongoDb connection
import connectDB from './config/db.js'
connectDB()
//Routes
import userRoutes from './routes/userRoutes.js'
import  busRoutes from './routes/busRoutes.js'
import  tripRoutes from './routes/tripRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'
import cookieParser from 'cookie-parser';


const app = express()
app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.use(cookieParser());
//port connection
const port = process.env.PORT || 8000
app.listen(port, ()=> {
    console.log("Listening to " + port);
})

//Routes
app.use('/api/users', userRoutes)
app.use('/api/Buses', busRoutes)
app.use('/api/Trips', tripRoutes)
app.use('/api/Tickets', ticketRoutes)


