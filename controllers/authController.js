import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';
import attachCookie from '../utils/attachCookies.js';
const register = async (req, res) => {
  const { name, email, password, remember } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError('please provide all values');
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }
  const user = await User.create({ name, email, password, remember });

  const token = user.createJWT();
  attachCookie({ res, token, remember });
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    location: user.location,
    darkMode: user.darkMode,
  });
};
const login = async (req, res) => {
  const { email, password, remember } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  user.remember = remember;
  await user.save();

  const token = user.createJWT();
  attachCookie({ res, token, remember });
  user.password = undefined;

  res.status(StatusCodes.OK).json({ user, location: user.location, darkMode: user.darkMode });
};
const updateUser = async (req, res) => {
  const { email, name, lastName, location, darkMode } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;
  user.darkMode = darkMode;

  await user.save();

  const token = user.createJWT();
  attachCookie({ res, token, remember: user.remember });

  res.status(StatusCodes.OK).json({ user, location: user.location, darkMode: user.darkMode });
};

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user, location: user.location, darkMode: user.darkMode });
};

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

export { register, login, updateUser, getCurrentUser, logout };
