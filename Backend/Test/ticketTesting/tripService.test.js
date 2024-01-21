import {findTrip,createTicket,checkSeats, UpdateTrip,findTicket,getTickets,cancel,  update} from '../../services/ticketService.js';
  import Ticket from '../../models/ticketModel.js';
  import Trip from '../../models/tripModel.js';
  
  jest.mock('../../models/ticketModel.js', () => ({
    create: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
  }));
  
  jest.mock('../../models/tripModel.js', () => ({
    findById: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn().mockResolvedValue(),
  }));
  
  describe('ticketService', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('findTrip', () => {
      it('Find Trip By Id', async () => {
        const tripId = 'TripId';
        const tripMock = {
            _id: tripId,
            busNumber: 'TN38',
            availableSeats: 40,
            date: '2024-01-15',
            departureTime: '08:00 AM',
            arrivalTime: '12:00 PM',
            origin: 'Tanjore',
            destination: 'Madurai',
            price: 500,
        };
  
        Trip.findById.mockResolvedValue(tripMock);
  
        const result = await findTrip(tripId);
  
        expect(Trip.findById).toHaveBeenCalledWith(tripId);
        expect(result).toEqual(tripMock);
      });
    });
  
    describe('Book a Trip and Create a Ticket', () => {
      it('should create a ticket and return the new ticket', async () => {
        const newTicketMock = {
            _id: 'Id',
            busNumber: 'TN38',
            availableSeats: 40,
            date: '2024-01-15',
            departureTime: '12:00',
            arrivalTime: '05:00',
            origin: 'Coimbatore',
            destination: 'Chennai',
            price: 500,
        };
  
        Ticket.create.mockResolvedValue(newTicketMock);
  
        const result = await createTicket(
          'UserId',
          'TripId',
          'TN123',
          new Date(),
          'passengers',
          '3',
          '25-01-2024',
          '12:00',
          '05:00',
          'Coimbatore',
          'Chennai',
          '500'
        );
  
        expect(Ticket.create).toHaveBeenCalled();
        expect(result).toEqual(newTicketMock);
      });
    });
  
    describe('checkSeats', () => {
      it('Check the Seats are Booked or Not', async () => {
        const tripId = 'TripId';
        const seatNumbers = [1, 2, 3];
  
        Trip.findOne.mockResolvedValue(null);
  
        const result = await checkSeats(tripId, seatNumbers);
  
        expect(Trip.findOne).toHaveBeenCalledWith({
          _id: tripId,
          bookedSeats: { $in: seatNumbers },
        });
        expect(result).toBeNull();
      });
    });
  
    describe('UpdateTrip', () => {
      it('Update the Trip After Ticket has Booked', async () => {
        const tripId = 'TripId';
        const numberOfSeats = 2;
        const seatNumbers = [4, 5];
  
        const updatedTripMock = {
            _id: tripId,
            busNumber: 'TN38',
            availableSeats: 40,
            date: '2024-01-15',
            departureTime: '08:00',
            arrivalTime: '12:00',
            origin: 'Coimbatore',
            destination: 'Chennai',
            price: 500,
        };
  
        Trip.findOneAndUpdate.mockResolvedValue(updatedTripMock);
  
        const result = await UpdateTrip(tripId, numberOfSeats, seatNumbers);
  
        expect(Trip.findOneAndUpdate).toHaveBeenCalledWith(
          { _id: tripId },
          { $inc: { availableSeats: -numberOfSeats }, $push: { bookedSeats: seatNumbers } },
          { new: true }
        );
        expect(result).toEqual(updatedTripMock);
      });
    });
  
    describe('findTicket', () => {
      it('Find Ticket By Id', async () => {
        const ticketId = 'TicketId';
        const ticketMock = {
          _id: ticketId,
          user_id: 'UserId',
          trip_id: 'tripId',
          busNumber: 'TN38',
          bookingDate: '2024-01-12',
          passengers: ['passengers'],
          numberOfSeats: '3',
          date: "2024-01-15",
          departureTime: '08:00',
          arrivalTime: '12:00',
          origin: 'Coimbatore',
          destination: 'Chennai',
          price: '500'
        };
  
        Ticket.findById.mockResolvedValue(ticketMock);
  
        const result = await findTicket(ticketId);
  
        expect(Ticket.findById).toHaveBeenCalledWith(ticketId);
        expect(result).toEqual(ticketMock);
      });
    });
  
    describe('getTickets', () => {
      it('Get tickets by user ID', async () => {
        const userId = 'UserId';
        const ticketsMock = [
          {
            _id: 'ticket1',
            user_id: 'UserId',
            trip_id: 'tripId',
            busNumber: 'TN38',
            bookingDate: '2024-01-12',
            passengers: ['passengers'],
            numberOfSeats: '3',
            date: "2024-01-15",
            departureTime: '08:00',
            arrivalTime: '12:00',
            origin: 'Coimbatore',
            destination: 'Chennai',
            price: '500'
          },
          {
            _id: 'ticket2',
            user_id: 'UserId',
            trip_id: 'tripId',
            busNumber: 'TN38',
            bookingDate: '2024-01-12',
            passengers: ['passengers'],
            numberOfSeats: '3',
            date: "2024-01-15",
            departureTime: '08:00',
            arrivalTime: '12:00',
            origin: 'Coimbatore',
            destination: 'Chennai',
            price: '500'
          },
        ];
  
        Ticket.find.mockResolvedValue(ticketsMock);
  
        const result = await getTickets(userId);
  
        expect(Ticket.find).toHaveBeenCalledWith({ user_id: userId });
        expect(result).toEqual(ticketsMock);
      });
    });
  
    describe('cancel', () => {
      it('Cancel a ticket by ID', async () => {
        const ticketId = 'TicketId';
        const ticketMock = {
          _id: ticketId,
          user_id: 'UserId',
          trip_id: 'tripId',
          busNumber: 'TN38',
          bookingDate: '2024-01-12',
          passengers: ['passengers'],
          numberOfSeats: '3',
          date: "2024-01-15",
          departureTime: '08:00',
          arrivalTime: '12:00',
          origin: 'Coimbatore',
          destination: 'Chennai',
          price: '500'
        };
  
        Ticket.findById.mockResolvedValue(ticketMock);
  
        const result = await cancel(ticketId);
  
        expect(Ticket.findById).toHaveBeenCalledWith(ticketId);
        expect(result).toEqual(ticketMock);
      });
    });
  
    describe('update', () => {
        it('Update a Trip After Ticket has Cancelled', async () => {
            const tripId = 'someTripId';
            const numberOfSeats = 2;
            const seatNo = [4, 5];
      
            const updatedTripMock = {
                _id: tripId,
                busNumber: 'TN38',
                availableSeats: 40,
                date: '2024-01-15',
                departureTime: '08:00 AM',
                arrivalTime: '12:00 PM',
                origin: 'Tanjore',
                destination: 'Madurai',
                price: 500,
            };
      
            Trip.findOneAndUpdate.mockResolvedValue(updatedTripMock);
      
            const result = await update(tripId, numberOfSeats, seatNo);
      
            expect(Trip.findOneAndUpdate).toHaveBeenCalledWith(
              { _id: tripId },
              { $inc: { availableSeats: numberOfSeats }, $pull: { bookedSeats: { $in : seatNo} } },
              { new: true }
            );
            expect(result).toEqual(updatedTripMock);
          });
    });
  });
  