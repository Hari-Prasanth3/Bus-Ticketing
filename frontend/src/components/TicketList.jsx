import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'
import { useParams } from 'react-router-dom';
import Loader from './loader';
import { Button } from "@mui/material";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  // console.log(tickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  // console.log(selectedTicket);

  const [isLoading, setIsLoading] = useState(false)

  const {id } = useParams();
  // console.log(id);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      const res = await axios.put(`/api/tickets/${id}`);
      alert("Do you Really Want to cancel your ticket?")
      console.log(res)
      toast.success('Ticket Cancelled');
      setIsLoading(false)
  } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error)
      setIsLoading(false)
  }
}

  //for get ticket by ID
  const handleViewTickets = async (ticketId) => {
    setIsLoading(true)

    try {
      const res = await axios.get(`/api/tickets/${ticketId}`);
      setSelectedTicket(res.data);
      // setIsLoading(false)
    } catch (err) {
      toast.error(err.response.data.message)
      console.error(err.message);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get('/api/tickets');
        setTickets(res.data);
      } catch (err) {
      toast.error(err.response.data.message)
      // console.error(err.message);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>

      {selectedTicket ? (
        <div className="mx-auto text-center border bg-white shadow-md rounded-md p-8 max-w-md">
          <h3 className="text-2xl font-bold">{selectedTicket.busNumber}</h3>
          <p className="text-xl">{selectedTicket.origin} - {selectedTicket.destination}</p>
          <p className="text-xl">{selectedTicket.totalPrice}</p>
          <p className="text-center mt-4">{selectedTicket.date.slice(0,10)}</p>
          <div className="text-center mt-4">{selectedTicket.passengers.map((passenger) => (
            <>
            <h1>Name:  {passenger.name}</h1>
            <h1>Seat Number:   {passenger.seatNo}</h1>
            <h1>Age:  {passenger.age}</h1></>
          ))}</div>
          
          <p className="text-center mt-4">Status: {selectedTicket?.isBooked ? 'Ticket Booked' : 'Ticket Cancelled'}</p>
          {selectedTicket.isBooked && (
            <Button onClick={submitHandler} className="mt-10 block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
              Cancel Ticket
            </Button>
          )}
          <Link to={`/tickets`}>
            <button className="mt-8 block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Back to Tickets
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 mb-12 md:grid-cols-3 lg:grid-cols-3 gap-3">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white shadow-md rounded-md p-4">
              <h1 className="text-center mt-4 font-bold">Tickets Details</h1>
              <h3 className="text-center mt-4"> {ticket.busNumber}</h3>
              <p className="text-center mt-4">{ticket.origin} - {ticket.destination}</p>
              <p className="text-center mt-4">{ticket.totalPrice}</p>
              <p className="text-center mt-4">Status: {ticket?.isBooked ? 'Booked' : 'Ticket Cancelled'}</p>
              <Link to={`/ticket/${ticket._id}`}>
                <Button className="mt-10 pt-0 float-end" onClick={() => handleViewTickets(ticket._id)}>
                  view tickets
                </Button>
              </Link>
             

            </div>
      
       ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;