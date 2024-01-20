import { createTrip, getTripById, SearchBus } from '../../controllers/tripController.js';
import * as tripService from '../../services/tripService.js';
import * as validateMiddleware from '../../middleWare/validateMiddleWare.js';

jest.mock('../../services/tripService');
jest.mock('../../middleWare/validateMiddleWare');

describe('createTrip', () => {
  it('should return 400 with error message if trip already exists', async () => {
    const req = {
      body: {
        busNumber: 'TN37CV5463',
        availableSeats: 10,
        date: '2022-12-01',
        departureTime: '12:00',
        arrivalTime: '14:00',
        origin: 'Coimbatore',
        destination: 'Bangalore',
        price: 200
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const checkTripMock = jest.fn(() => Promise.resolve({ busNumber: 'TN37CV5463', date: '2022-12-01' }));
    tripService.checkTrip = checkTripMock;
    validateMiddleware.tripValidation = jest.fn(() => ({ error: null, value: req.body }));
    await createTrip(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Trip already exists' });
  });

  it('should return 200 with trip details if trip is added successfully', async () => {
    const req = {
      body: {
        busNumber: 'TN37CV5463',
        availableSeats: 10,
        date: '2022-12-01',
        departureTime: '12:00',
        arrivalTime: '14:00',
        origin: 'Coimbatore',
        destination: 'Bangalore',
        price: 200
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const checkTripMock = jest.fn(() => Promise.resolve(null));
    tripService.checkTrip = checkTripMock;
    tripService.addTrip = jest.fn(() => Promise.resolve({ busNumber: 'TN37CV5463', availableSeats: 10, date: '2022-12-01', departureTime: '12:00', arrivalTime: '14:00', origin: 'Coimbatore', destination: 'Bangalore', price: 200 }));
    validateMiddleware.tripValidation = jest.fn(() => ({ error: null, value: req.body }));
    await createTrip(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      busNumber: 'TN37CV5463',
      availableSeats: 10,
      date: '2022-12-01',
      departureTime: '12:00',
      arrivalTime: '14:00',
      origin: 'Coimbatore',
      destination: 'Bangalore',
      price: 200
    });
  });
});

describe('getTripById', () => {
  it('should return 200 with trip details if trip is found', async () => {
    const req = {
      params: {
        id: '1'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    tripService.getTrip = jest.fn(() => Promise.resolve({ id: '1', busNumber: 'TN37CV5463', availableSeats: 10, date: '2022-12-01', departureTime: '12:00', arrivalTime: '14:00', origin: 'Coimbatore', destination: 'Bangalore', price: 200}));
    await getTripById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: '1', busNumber: 'TN37CV5463', availableSeats: 10, date: '2022-12-01', departureTime: '12:00', arrivalTime: '14:00', origin: 'Coimbatore', destination: 'Bangalore', price: 200 });
  });

  it('should return 404 with message if trip is not found', async () => {
    const req = {
      params: {
        id: '1'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    tripService.getTrip = jest.fn(() => Promise.resolve(null));
    await getTripById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Trip not found' });
  });
});

describe('SearchBus', () => {
  it('should return 404 with message if no buses are available', async () => {
    const req = {
      query: {
        from: 'Coimbatore',
        to: 'Bangalore',
        date: '2022-12-01'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    validateMiddleware.searchValidation = jest.fn(() => ({ error: null, value: req.query }));
    tripService.searchTrip = jest.fn(() => Promise.resolve([]));
    await SearchBus(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'No available buses' });
  });


it('should return 200 with buses if buses are available', async () => {

const req = {
    query: {
      from: 'Coimbatore',
      to: 'Bangalore',
      date: '2022-12-01'
    }
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  validateMiddleware.searchValidation = jest.fn(() => ({ error: null, value: req.query }));
  tripService.searchTrip = jest.fn(() => Promise.resolve([
    {
      id: '1',
      busNumber: 'TN37CV5463',
      availableSeats: 10,
      date: '2022-12-01',
      departureTime: '12:00',
      arrivalTime: '14:00',
      origin: 'Coimbatore',
      destination: 'Bangalore',
      price: 200
    },
    {
      id: '2',
      busNumber: 'TN37CQ5463',
      availableSeats: 20,
      date: '2022-12-01',
      departureTime: '15:00',
      arrivalTime: '17:00',
      origin: 'Coimbatore',
      destination: 'Bangalore',
      price: 300
    }
  ]));
  await SearchBus(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith([
    {
      id: '1',
      busNumber: 'TN37CV5463',
      availableSeats: 10,
      date: '2022-12-01',
      departureTime: '12:00',
      arrivalTime: '14:00',
      origin: 'Coimbatore',
      destination: 'Bangalore',
      price: 200
    },
    {
      id: '2',
      busNumber: 'TN37CQ5463',
      availableSeats: 20,
      date: '2022-12-01',
      departureTime: '15:00',
      arrivalTime: '17:00',
      origin: 'Coimbatore',
      destination: 'Bangalore',
      price: 300
    }
  ]);
});
})
