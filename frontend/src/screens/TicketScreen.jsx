
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants";
import { selectTrip } from "../slices/tripSlice";
import { Container } from "@mui/material";
import { addPassenger } from "../slices/passengerSlice";
import Ticket from "../components/Ticket";
import Loader from "../components/loader";
import { Button, Card, TextField ,useMediaQuery} from "@mui/material";

const TicketScreen = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const { id } = useParams();
  // console.log(id);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [number, setNumber] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [forms, setForms] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [button, setButton] = useState([false]);
  const [isLoading, setIsLoading] = useState(true)

  
  
  const { trip } = useSelector((state) => state.trip);

  //Handlers
  const passengerReq = (index, e, field) => {
    const { value } = e.target;
    setPassengers((prevPassenger) => {
      const updatedPassenger = [...prevPassenger];
      updatedPassenger[index] = { ...updatedPassenger[index], [field]: value };
      return updatedPassenger;
    });
  };

  const checkboxHandler = (index) => {
    // Update selectedSeats state
    setSelectedSeats((prevSelectedSeats) => {
      const seatIndex = prevSelectedSeats.indexOf(index);
      if (seatIndex === -1) {
        return [...prevSelectedSeats, index];
      } else {
        return prevSelectedSeats.filter((seat) => seat !== index);
      }
    });
  };
  //for press book ticket
  const ticketBookingButton = (e) => {
    e.preventDefault();
    const passengerData = selectedSeats.map((button, index) => ({
      name: passengers[index]?.name || "",
      age: passengers[index]?.age || "",
      seatNo: selectedSeats[index] + 1,
    }));
    dispatch(addPassenger(passengerData));

    setButton(false);
  };

  useEffect(() => {  
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/trips/${id}`);
        // console.log("API Response:", res);
        const tripData = res.data;
        // console.log("Trip Data:", tripData);
        setData(tripData);
        setNumber(tripData.bookedSeats.length + tripData.availableSeats);
        dispatch(selectTrip(tripData));
        setIsLoading(false);
      } catch (error) {
        // console.error('Error fetching trip:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, id]);
  useEffect(() => {
    // Create forms based on selected seats
    const newForms = selectedSeats.map((seat, index) => (
      <form key={index} className="m-5  flex">
        {/* <div>Passenger {index + 1}</div> */}
        <TextField
          label="Name"
          variant="outlined"
          onChange={(e) => passengerReq(index, e, "name")}
          required
      
        />
        <TextField
          label="Age"
          variant="outlined"
          onChange={(e) => passengerReq(index, e, "age")}
          required
        />
        <TextField disabled label={`Seat ${seat + 1}`} />
      </form>
    ));
    setForms(newForms);
    setTotalPrice(selectedSeats.length * data?.price || 0);
  }, [selectedSeats]);

  const seatsPerRow = Math.ceil(number / 3);
  const seatRows = Array.from({ length: 3 }).map((_, rowIndex) => {
    const startIndex = rowIndex * seatsPerRow;
    const endIndex = Math.min(startIndex + seatsPerRow, number);
    return (
      <div className=" bg-white shadow-md rounded-md">
      <div key={rowIndex} className="flex justify-center  bg-gray-200 shadow-md rounded-md">
        {Array.from({ length: endIndex - startIndex }).map((_, index) => {
          const seatIndex = startIndex + index;
          return (
            <div
              key={seatIndex}
              className={`w-10 h-12 m-3 flex items-center justify-center
                        border-2 border-gray-400 cursor-pointer ${
                          selectedSeats.includes(seatIndex)
                            ? "bg-blue-400 border-blue-800"
                            : data.bookedSeats.includes(seatIndex + 1)
                            ? "bg-gray-400 opacity-50 pointer-events-none"
                            : "bg-green-400"
                        }`}
              onClick={() => checkboxHandler(seatIndex)}
            >
              <input type="checkbox" className="hidden checkbox" />
              <span className="text-xs">S{seatIndex + 1}</span>
            </div>
          );
        })}
      </div>
      </div>
    );})



  return (
  

    <>   {isLoading ? (
      <Loader />
    )
        : data ? (
          button ? (
                     
              <div className="flex flex-col items-center">
              <h1 className="text-2xl mb-4">Select your Seats Here</h1>
            
            <div className="mb-4">{seatRows}</div>
            {selectedSeats.length ? ( 
              <Card className="w-50  mt-10   bg-yellow-100">
           
                
             <form onSubmit={ticketBookingButton}>
               {forms} 

                <Button
                  type="submit"
                  variant="outlined"
                  className="bg-black float-right m-3 text-white border-white hover:bg-white hover:text-black hover:border-black "
                >
                  pay    {totalPrice}
                </Button>
              </form>
              </Card>
              ) :(
                <></>
              )}  
              
              
            </div>
          
        
          ) : ( 
            
            <Container className="w-50  h-50">
              <Card className="w-[50%] h-80">
              
                <div className="mt-4 h-auto w-full">
              <Button className="mt-2 ml-2  bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded" variant="outlined" onClick={() => setButton(true)}>
                Back
                </Button>
                <Ticket />
                </div>
              
              </Card>
            </Container>
          )
        ) : (
          <Link to={"/SearchScreen"}>
            <Button
              type="button"
              variant="outlined"
              className="bg-black text-white border-white hover:bg-white hover:text-black hover:border-black m-2"
            >
              Go Back
            </Button>
          </Link>
        )}
    
    </>
  );
};
export default TicketScreen;
