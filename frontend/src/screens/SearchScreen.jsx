import React from 'react'
import { TextField,FormControl } from '@mui/material'
import { useState,useEffect } from 'react';
import {  useDispatch } from 'react-redux';
import {Link, useNavigate,useLocation} from 'react-router-dom';
import {toast} from 'react-toastify'
import { getTrips } from '../slices/tripSlice';
import Axios from 'axios'
import { useSelector } from 'react-redux';

const SearchScreen = () => {


  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [Trips, setTrips] = useState([]);

  const dispatch = useDispatch();
  const navigate= useNavigate();
  // const [error, setError] = useState(null);

  const {trips} = useSelector((state) => state.trip); 
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect" || "/");
  useEffect(() => { 
    if (trips) {
      navigate(redirect);
    }
  }, [navigate, redirect, trips]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/Trips/search?from=${from}&to=${to}&date=${date}`);
      dispatch(getTrips({...res}));

      if (!res.ok) {
        throw new Error("No Trips Available");
      }

      const data = await res.json();
      setTrips(data);
    } catch (err) {
      toast.error(err.message)
    }
  };

 

  return (
    <form      
    onSubmit={submitHandler}>
      <div className='grid grid-cols-4 p-10  m-auto justify-center  w-[75%]'>
      <div>
      <TextField id="filled-basic" label="From" variant="outlined" className='mt-[8px]' type='text' value={from}
          onChange={(e) => setFrom(e.target.value)}  required/>
      
      </div>
      <div>
           <TextField id="filled-basic" label="To" variant="outlined" className='mt-[8px]' type='text' value={to}
          onChange={(e) => setTo(e.target.value)}
          required />

      
      </div>
      <div > 

        <TextField id="filled-basic" variant="outlined" className='mt-[8px] sm:w-[80px] lg:w-auto'
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button className='text-sm font-semibold text-white  bg-blue-600 rounded shadow-md border-2 border-blue-600 md:text-base hover:bg-white hover:text-blue-900 mt-2' type="submit">Search</button>
      </div>
      {trips.length > 0 && (
        <ul>
          {trips.map((trip) => (



  <div
    // style={{ width: "430px" }}
    className="bg-white shadow-md rounded-md p-4 mb-4 sm:h-200px] max-w-100-md "
  >
    <div className="flex justify-between mb-4 ">
      <div>
        <p className="  text-lg font-semibold  pl-5 ">Bus Number: {trip.busNumber}</p>
        <p>{trip.isSleeper}</p>
        <p className=' pl-5'>{trip.date}</p>
      </div>
      <div className="text-md font-semibold text-gray-600 pr-5">
        {trip.departureTime} - {trip.arrivalTime}
      </div>
    </div>
    <div className="flex justify-center">
      <div className='pr-5'>
        <p>{trip.origin}</p>
      

      </div>
      -
      <div className='pl-5 '>
        <p>{trip.destination}</p>
      </div>
    </div>
    <div className="flex justify-between items-center mt-4">
      <div className="text-md font-semibold  pl-5">

       Booked Seats: {trip.bookedSeats.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <br />
       Available Seats: {trip.availableSeats} 

      </div>
      <div className='flex justify-center mr-10 mt-7 pr-10'>Price <p>{trip.price}</p></div>
      <Link to='/ticket'>
      <button className="bg-blue-500 text-white py-2 px-4 rounded">
        View Seats
      </button></Link>
    </div>
  </div>



            
     
            
        
          ))}
        </ul>
      )}
    </form>
  );
};

// export default SearchScreen;
      // }
export default SearchScreen