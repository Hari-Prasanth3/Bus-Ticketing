import React from "react";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../constants";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/loader";
import TravelCarousel from "../components/TravelCarousel";
import { getTrips } from "../slices/tripSlice";
import axios from "axios";

const SearchScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [trips, setTrips] = useState([]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.get(
        `${BASE_URL}/api/Trips/search?from=${from}&to=${to}&date=${date}`
      );
      const data = res.data;
      setTrips(data);
      dispatch(getTrips({ ...res.data }));
    } catch (err) {
      if (err.response.data.message === "No Available Trips") {
        const error = err.response.data;
        dispatch(getTrips({ ...error }));
      } else {
        toast.error(err.response.data.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <>
    <div className='flex justify-center'>
      {/* Hide TravelCarousel for mobile devices */}
      <div className="hidden lg:block absolute w-full -z-10  h-72  mb-10  "><TravelCarousel/></div>
      <form className="flex flex-col lg:flex-row shadow-xl   w-auto lg:mt-24 mt-3 justify-center p-5 rounded-lg bg-white" onSubmit={submitHandler}>
        <TextField
          id="outlined-required"
          label="From"
          variant="outlined"
          className='mt-[8px] '
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
        
        <TextField
          id="outlined-required"
          label="To"
          variant="outlined"
          className='mt-[8px]'
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
       
         <TextField 
          id='outline-required'
          variant='outlined'
          className='mt-[8px]'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type='date'
          format="yyyy-mm-dd"
          required
        /> 
       
        <Button variant="outlined"
            className="text-sm font-semibold text-white bg-blue-600 rounded shadow-md border-2 border-blue-600 md:text-base hover:bg-white hover:text-blue-900 md:mt-2 mt-0"
            type="submit"
          >
            Search
          </Button>
      </form>
      {/* <Loader /> */}
    </div>
  

      {isLoading && <Loader />}

      <ul>
        {trips.length > 0 &&
          trips.map((trip) => (
            <li key={trip._id}>
              <div className="bg-white shadow-md rounded-md p-4 mt-40 mb-10">
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-lg font-semibold flex justify-start mt-4">
                      Bus Number: {trip.busNumber}
                    </p>
                    <p>{trip.isSleeper}</p>
                  </div>
                </div>
                <p></p>
                <div className="flex justify-center font-semibold m-2">
                  {trip.date.slice(0, 10)}
                </div>
                <div className="flex justify-center font-semibold text-gray-700 text-2xl pr-5">
                  <div className="pr-5 mb-3">
                    {trip.departureTime}
                    <p>{trip.origin}</p>
                  </div>
                  -
                  <div className="pl-5">
                    {trip.arrivalTime}
                    <p>{trip.destination}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  {/* <div className="text-md font-semibold pl-5">
                    Booked Seats:{" "}
                    {trip.bookedSeats
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    <br />
                    {trip.availableSeats} Seats Available
                  </div> */}

                  <div className="flex justify-center text-gray-600 font-semibold float-right">
                    Starting At {trip.price}
                  </div>

                  <Link to={`/trip/${trip._id}`}>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded">
                      View Seats
                    </button>
                  </Link>
                  {isLoading && <Loader />}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default SearchScreen;
