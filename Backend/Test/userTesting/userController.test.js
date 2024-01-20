import generateToken from "../../utils/generateToken.js";
import { authenticateUser, createUser,getUser } from "../../services/service.js";
import {authUser, registerUser,getUserById} from "../../controllers/userController.js";

jest.mock("../../utils/generateToken.js");
jest.mock("../../services/service.js");
// jest.mock("../models/userModel.js");

describe("User Controller Tests", () => {
    afterEach(( ) => {
        jest.clearAllMocks();
    });

    test("authUser should authenticate a user", async () => {
        const req = {
            body: {
                email: "test@email.com",
                password: "1234",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const user = {
            _id: "12345",
            name: "test user",
            email: "test@email.com",
            isAdmin: false,
        };
        authenticateUser.mockResolvedValue(user);

        await authUser(req, res);

        expect(authenticateUser).toHaveBeenCalledWith(req.body.email, req.body.password);
        expect(generateToken).toHaveBeenCalledWith(res, user._id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    });
  
    test('registerUser should register a user', async () => {
        const req = {
          body: {
            name: 'tests user',
            email: 'tests@email.com',
            password: '1234',
          
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
        const user = {
          _id: '12345',
          name: 'tests user',
          email: 'tests@email.com',
          password: '1234',
          isAdmin: false,
        };
      createUser.mockResolvedValue(user);      
        await registerUser(req, res);
      
        expect(createUser).toHaveBeenCalledWith(req.body.name, req.body.email, req.body.password, req.body.isAdmin);
        expect(generateToken).toHaveBeenCalledWith(res, user._id);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          _id: user._id,
          name: user.name,
          email: user.email,
          // password: user.password,
          isAdmin: user.isAdmin,
        });
      });
    test("getUserById should return a user by id", async () => {
        const req = {
            params: {
                id: "12345",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const user = {
            _id: "12345",
            name: "test user",
            email: "test@email.com",
            isAdmin: false,
        };
        getUser.mockResolvedValue(user);

        await getUserById(req, res);

        expect(getUser).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(user);
    });
});