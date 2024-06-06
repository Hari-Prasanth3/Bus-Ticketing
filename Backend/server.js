import express  from "express"
import dotenv from "dotenv"
import path from "path";
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

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // any route that is not api will be redirected to indexedDB.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}


