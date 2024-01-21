import { UpdateTrip, checkSeats, createTicket, findTicket, findTrip, getTickets, cancel, update } from '../../services/ticketService.js';
import {BookTrip,getTicketById,getAllTickets,   cancelTicket} from '../../controllers/ticketController';
import { userId } from '../../middleWare/authMiddleWare';
  
jest.mock('../../services/ticketService.js', () => ({
    findTrip: jest.fn(),
    findTicket: jest.fn(),
    getTickets: jest.fn(),
    cancel: jest.fn(),
    update: jest.fn(),
    createTicket: jest.fn(),
    UpdateTrip: jest.fn(),
    checkSeats: jest.fn(),
}));
  
  jest.mock('../../middleware/authMiddleWare.js', () => ({
    userId: jest.fn()
  }));
  
  describe('Ticket Controller', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('BookTrip', () => {
        const req = {
                body: {
                passengers:[{
                    name: 'Smith',
                    age: '19',
                    seatNo: '1'
                }]
                },
                params: {
                trip_id: 'TripId'
                }
            };
        const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

        it('Book Trip and Create Ticket', async () => {
          findTrip.mockResolvedValue({
            _id: 'TripId',
            busNumber: 'TN38',
            availableSeats: 40,
            date: '2024-01-15',
            departureTime: '08:00 AM',
            arrivalTime: '12:00 PM',
            origin: 'Tanjore',
            destination: 'Madurai',
            price: 500,
          });
          checkSeats.mockResolvedValue(null);
          createTicket.mockResolvedValue({
            user_id: 'UserId',
            trip_id: 'TripId',
            busNumber: 'TN123',
            bookingDate: new Date(),
            passengers: req.body.passengers,
            numberOfSeats: '3',
            date: '25-01-2024',
            departureTime: '12:00',
            arrivalTime: '05:00',
            origin: 'Coimbatore',
            destination: 'Chennai',
            totalPrice: '500',
          });
          UpdateTrip.mockResolvedValue({
            _id: 'TripId',
            busNumber: 'TN38',
            availableSeats: 40,
            date: '2024-01-15',
            departureTime: '08:00',
            arrivalTime: '12:00',
            origin: 'Coimbatore',
            destination: 'Chennai',
            price: 500,
          });
      
          await BookTrip(req, res);
      
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({
            user_id: 'UserId',
            trip_id: 'TripId',
            busNumber: 'TN123',
            bookingDate: expect.any(Date),
            passengers: req.body.passengers,
            numberOfSeats: '3',
            date: '25-01-2024',
            departureTime: '12:00',
            arrivalTime: '05:00',
            origin: 'Coimbatore',
            destination: 'Chennai',
            totalPrice: '500',
          });
        });
      });
      
  
    describe('getTicketById', () => {
        const req = {
            params: {
              id: 'TicketId'
            }
          };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
          };
      it('Get Ticket By Id', async () => {
        findTicket.mockResolvedValue({
            _id: req.params.id,
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
        })
  
        await getTicketById(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            _id: req.params.id,
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
        });
      });
      it('Ticket Not Found',async () => {
        findTicket.mockResolvedValue(null)

        await getTicketById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Tickets not found'
        })        
      })
    });
  
    describe('getAllTickets', () => {
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        it('Get all tickets for a User', async () => {
          
          userId.mockResolvedValue('user_id');
      
          const tickets = [
            {
              _id: 'ticket1',
              user_id: 'user_id',
              trip_id: 'tripId',
              busNumber: 'TN38',
              bookingDate: '2024-01-12',
              passengers: ['passengers'],
              numberOfSeats: '3',
              date: '2024-01-15',
              departureTime: '08:00',
              arrivalTime: '12:00',
              origin: 'Coimbatore',
              destination: 'Chennai',
              isBooked: true,
              price: '500',
            },
            {
              _id: 'ticket2',
              user_id: 'user_id',
              trip_id: 'tripId',
              busNumber: 'TN38',
              bookingDate: '2024-01-12',
              passengers: ['passengers'],
              numberOfSeats: '3',
              date: '2024-01-15',
              departureTime: '08:00',
              arrivalTime: '12:00',
              origin: 'Coimbatore',
              destination: 'Chennai',
              isBooked: false,
              price: '500',
            },
          ];
          getTickets.mockResolvedValue(tickets);
      
          await getAllTickets({}, res);

          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(tickets);
        });
        it('Tickets Not Found', async() => {
            userId.mockResolvedValue('user_id');

            getTickets.mockResolvedValue([]);
      
            await getAllTickets({}, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "Tickets not found"
            });
        })
      });
  
    describe('cancelTicket', () => {
      const req = {
        params: {
          id: 'ticketId'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      it('Ticket not found', async () => {
        cancel.mockResolvedValue(null);

        await cancelTicket(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Ticket Not Found'
        });
    });

    it('Ticket already canceled', async () => {
        const canceledTicket = {
          _id: 'ticketId',
            user_id: 'user_id',
            trip_id: 'tripId',
            busNumber: 'TN38',
            bookingDate: '2024-01-12',
            passengers: [{name: 'Smith',age: 19,seatNo: 3}],
            numberOfSeats: '1',
            date: '2024-01-15',
            departureTime: '08:00',
            arrivalTime: '12:00',
            origin: 'Coimbatore',
            destination: 'Chennai',
            isBooked: false,
            price: '500',
         };
        cancel.mockResolvedValue(canceledTicket);

        await cancelTicket(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Ticket Already Canceled'
        });
    });

    });
  });
  