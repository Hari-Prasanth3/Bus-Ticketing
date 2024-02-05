import { newBus } from '../../services/busService.js';
import Bus from '../../models/busModel.js';

jest.mock('../../models/busModel.js', () => ({
  create: jest.fn(),
}));

describe('newBus', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Create a new Bus', async () => {
    const user_id = 'someUserId';
    const busNumber = 'TN38';
    const busSeats = 50;
    const isSleeper = true;

    const newBusMock = {
      _id: 'someId',
      user_id,
      busNumber,
      busSeats,
      isSleeper,
    };

    Bus.create.mockResolvedValue(newBusMock);

    const result = await newBus(user_id, busNumber, busSeats, isSleeper);

    expect(Bus.create).toHaveBeenCalledWith({
      user_id,
      busNumber,
      busSeats,
      isSleeper,
    });

    expect(result).toEqual(newBusMock);
  });

  it('Create a Bus Failed', async () => {
    const errorMessage = 'Error creating bus';
    const user_id = 'someUserId';
    const busNumber = 'TN38';
    const busSeats = 50;
    const isSleeper = true;

    Bus.create.mockRejectedValue(new Error(errorMessage));

    await expect(newBus(user_id, busNumber, busSeats, isSleeper)).rejects.toThrow(errorMessage);

    expect(Bus.create).toHaveBeenCalledWith({
      user_id,
      busNumber,
      busSeats,
      isSleeper,
    });
  });
});