import {  addTrip,checkTrip,getTrip,searchTrip} from '../../services/tripService.js';
  import Trip from '../../models/tripModel.js';
  
  jest.mock('../../models/tripModel.js', () => ({
    create: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
  }));
  
  describe('tripService', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('addTrip', () => {
      it('Create a Trip', async () => {
        const newTripMock = {
          _id: 'Id',
          busNumber: 'TN38',
          availableSeats: 40,
          date: '2024-01-15',
          departureTime: '08:00 AM',
          arrivalTime: '12:00 PM',
          origin: 'coimbatore',
          destination: 'chennai',
          price: 500,
        };
  
        Trip.create.mockResolvedValue(newTripMock);
  
        const result = await addTrip(
          newTripMock.busNumber,
          newTripMock.availableSeats,
          newTripMock.date,
          newTripMock.departureTime,
          newTripMock.arrivalTime,
          newTripMock.origin,
          newTripMock.destination,
          newTripMock.price
        );
  
        expect(Trip.create).toHaveBeenCalledWith({
          busNumber: newTripMock.busNumber,
          availableSeats: newTripMock.availableSeats,
          date: newTripMock.date,
          departureTime: newTripMock.departureTime,
          arrivalTime: newTripMock.arrivalTime,
          origin: newTripMock.origin,
          destination: newTripMock.destination,
          price: newTripMock.price,
        });
  
        expect(result).toEqual(newTripMock);
      });
    });
  
    describe('checkTrip', () => {
      it('Check Trip Already Exists', async () => {
        const existingTripMock = {
          _id: 'existingId',
          busNumber: 'TN39',
          date: '2024-01-15',
        };
  
        Trip.findOne.mockResolvedValue(existingTripMock);
  
        const result = await checkTrip(existingTripMock.busNumber, existingTripMock.date);
  
        expect(Trip.findOne).toHaveBeenCalledWith({
          busNumber: existingTripMock.busNumber,
          date: existingTripMock.date,
        });
  
        expect(result).toEqual(existingTripMock);
      });
    });
  
    describe('getTrip', () => {
      it('Get Trip By Id', async () => {
        const tripId = 'TripId';
        const tripMock = {
          _id: tripId,
          busNumber: 'TN40',
          date: '2024-01-16',
        };
  
        Trip.findById.mockResolvedValue(tripMock);
  
        const result = await getTrip(tripId);
  
        expect(Trip.findById).toHaveBeenCalledWith(tripId);
        expect(result).toEqual(tripMock);
      });
    });
  
    describe('searchTrip', () => {
      it('Search trips based on origin, destination, and date', async () => {
        const origin = 'Chennai';
        const destination = 'Delhi';
        const date = '2024-01-17';
  
        const tripsMock = [
          {
            _id: 'trip1',
            busNumber: 'TN41',
            date,
          },
          {
            _id: 'trip2',
            busNumber: 'TN42',
            date,
          },
        ];
  
        Trip.find.mockResolvedValue(tripsMock);
  
        const result = await searchTrip(origin, destination, date);
  
        expect(Trip.find).toHaveBeenCalledWith({
          origin: { $regex: origin, $options: 'i' },
          destination: { $regex: destination, $options: 'i' },
          date: date,
        });
  
        expect(result).toEqual(tripsMock);
      });
    });
  });
  