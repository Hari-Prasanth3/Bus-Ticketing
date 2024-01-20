import mongoose from 'mongoose';
import { authenticateUser, createUser, getUser } from '../../services/service.js';
import User from '../../models/userModel.js'

jest.mock('../../models/userModel.js', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
}));

describe('User Authentication Functions', () => {
  const mockUser = {
    _id: new mongoose.Types.ObjectId(),
    name: 'Test User',
    email: 'test@gmail.com',
    password: '1234',
    isAdmin: false,
    matchPassword: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('authenticateUser', () => {
    it('Login successful', async () => {
      const mockPassword = '1234';
      User.findOne.mockResolvedValue(mockUser);
      mockUser.matchPassword.mockResolvedValue(true);

      const result = await authenticateUser(mockUser.email, mockPassword);

      expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
      expect(mockUser.matchPassword).toHaveBeenCalledWith(mockPassword);
      expect(result).toEqual(mockUser);
    });

    it('User password is incorrect', async () => {
      const mockPassword = 'incorrectPassword';
      User.findOne.mockResolvedValue(mockUser);
      mockUser.matchPassword.mockResolvedValue(false);

      const result = await authenticateUser(mockUser.email, mockPassword);

      expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
      expect(mockUser.matchPassword).toHaveBeenCalledWith(mockPassword);
      expect(result).toBeUndefined();
    });
  });

  describe('createUser', () => {
    it('Create a new user', async () => {
      User.create.mockResolvedValue(mockUser);

      const result = await createUser(
        mockUser.name,
        mockUser.email,
        mockUser.password,
        mockUser.isAdmin
      );

      expect(User.create).toHaveBeenCalledWith({
        name: mockUser.name,
        email: mockUser.email,
        password: mockUser.password,
        isAdmin: mockUser.isAdmin,
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('getUser', () => {
    it('Get user by ID', async () => {
      User.findById.mockResolvedValue(mockUser);

      const result = await getUser(mockUser._id);

      expect(User.findById).toHaveBeenCalledWith(mockUser._id);
      expect(result).toEqual(mockUser);
    });

    it('User Not Found', async () => {
      User.findById.mockResolvedValue(null);

      const result = await getUser( new mongoose.Types.ObjectId());

      expect(User.findById).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});