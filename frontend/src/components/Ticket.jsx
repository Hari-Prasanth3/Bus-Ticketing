import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Ticket = () => {
  const { id } = useParams();
  const passengers = useSelector((state) => state.passenger);
  const { selectedTrip } = useSelector((state) => state.trip);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bookedTicket, setBookedTicket] = useState(null);

  const handler = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/Tickets/ticket/${id}`,
        passengers
      );
      const ticket = res.data;
      setBookedTicket(ticket); // Set the booked ticket details
      toast.success("Ticket Booked Successfully");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="mx-auto text-center h-auto p-4  max-w-md">
      <h1 className="mb-5 text-4xl font-bold">
        {bookedTicket ? "Ticket Booked" : "Proceed To Pay"}
      </h1>
      {bookedTicket ? (
        <>
          <h3>
       Trip:  {`${bookedTicket.origin} - ${bookedTicket.destination}`} <br />
        Time:  {`${bookedTicket.arrivalTime} - ${bookedTicket.departureTime}`}

          </h3>
          <h3> Date: {bookedTicket.date.slice(0,10)}</h3>
          <div>
            {passengers &&
              passengers.passengers.map((passenger) => (
                <>
                <h3 key={passenger.id}> SeatNumber:{passenger.seatNo}</h3>
                </>
              ))}
          </div>          <h1>Total Price - {bookedTicket.totalPrice}</h1>
        </>
      ) : (
        <>
          <h2>Bus Number - {selectedTrip.busNumber}</h2>
          <h3>
            Trip: {`${selectedTrip.origin} - ${selectedTrip.destination}`}
          </h3>
          <div>
            {passengers &&
              passengers.passengers.map((passenger) => (
                <h3 key={passenger.id}> SeatNo:{passenger.seatNo}</h3>
              ))}
          </div>
          <h1>
            Total Price -{" "}
            {`${selectedTrip.price} * ${passengers.passengers.length} = ${
              selectedTrip.price * passengers.passengers.length
            }`}
          </h1>
          {userInfo ? (
            <Button
              className="mt-8"
              type="button"
              variant="outlined"
              onClick={handler}
            >
              {" "}
              Book Ticket
            </Button>
          ) : (
            <>
             
              <p className="">Please sign In to book a ticket</p>
              <Link to="/login">
                <Button>Sign in</Button>
              </Link>
            </>
          )}
        </>
      )}
      
    </div>
  );
};

export default Ticket;
