import Bus from "../models/busModel.js";
import {addBus} from '../controllers/busController.js'


jest.mock("../models/busModel.js", () => {
 return {
    create: jest.fn().mockResolvedValue({
      user_id: 1,
      busNumber: "ABC-123",
      busSeats: 42,
      isSleeper: true,
    }),
 };
});

describe("addBus", () => {
 afterEach(() => {
    jest.clearAllMocks();
 });

 it("should add a bus successfully", async () => {
    const user_id = 1;
    const busNumber = "ABC-123";
    const busSeats = 42;
    const isSleeper = true;

    const bus = await addBus(user_id, busNumber, busSeats, isSleeper);

    expect(bus).toEqual({
      user_id: 1,
      busNumber: "ABC-123",
      busSeats: 42,
      isSleeper: true,
    });
    expect(Bus.create).toHaveBeenCalledTimes(1);
    expect(Bus.create).toHaveBeenCalledWith({
      user_id: 1,
      busNumber: "ABC-123",
      busSeats: 42,
      isSleeper: true, 
    });
 });
});