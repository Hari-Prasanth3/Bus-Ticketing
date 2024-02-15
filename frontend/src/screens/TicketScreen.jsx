import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import { selectTrip } from '../slices/tripSlice';
import { useParams } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';



function BookTrip() {
  const [tripId, setTripId] = useState('');
  const [passengers, setPassengers] = useState([]);
  const {selectTrips} = useSelector((state) => state.trip); 
console.log(selectTrip);
const { id: trip_id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/Trips/${trip_id}`, { passengers });
      
      if (!response.ok) {
        throw new Error("No Trips Available");
      }

      const data = await response.json();
      // setTrips(data);
    } catch (err) {
      toast.error(err.message)
      // setError(err.message);
    }
  };

  return (
    <div>
      <h1>Book a Trip</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tripId">Trip ID:</label>
          <input
            type="text"
            id="tripId"
            value={tripId}
            onChange={(e) => setTripId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="passengers">Passengers:</label>
          <ul>
            {passengers.map((passenger, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={passenger.name}
                  onChange={(e) => {
                    const newPassengers = [...passengers];
                    newPassengers[index].name = e.target.value;
                    setPassengers(newPassengers);
                  }}
                />
                <input
                  type="number"
                  value={passenger.seatNo}
                  min={1}
                  max={10}
                  onChange={(e) => {
                    const newPassengers = [...passengers];
                    newPassengers[index].seatNo = parseInt(e.target.value, 10);
                    setPassengers(newPassengers);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setPassengers(passengers.filter((_, i) => i !== index));
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setPassengers([...passengers, { name: '', seatNo: 1 }]);
            }}
          >
            Add Passenger
          </button>
        </div>
        <button type="submit">Book Trip</button>
      </form>
    </div>
  );
}

export default BookTrip;