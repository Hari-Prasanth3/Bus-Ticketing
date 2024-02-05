import Bus from "../../models/busModel.js";
import {newBus} from '../../services/busService.js'


jest.mock("../../models/busModel.js", () => {
 return {
    create: jest.fn().mockResolvedValue({
      user_id: 1,
      busNumber: "TN37CV5637",
      busSeats: 42,
      isSleeper: true,
    }),
 };
});

describe("newBus", () => {
 afterEach(() => {
    jest.clearAllMocks();
 });

 it("should add a bus successfully", async () => {
    const user_id = 1;
    const busNumber = "TN37CV5637";
    const busSeats = 42;
    const isSleeper = true;

    const bus = await newBus(user_id, busNumber, busSeats, isSleeper);

    expect(bus).toEqual({
      user_id: 1,
      busNumber: "TN37CV5637",
      busSeats: 42,
      isSleeper: true,
    });
    expect(Bus.create).toHaveBeenCalledTimes(1);
    expect(Bus.create).toHaveBeenCalledWith({
      user_id: 1,
      busNumber: "TN37CV5637",
      busSeats: 42,
      isSleeper: true, 
    });
 });
});