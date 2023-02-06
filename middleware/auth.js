import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from "../errors/index.js";

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new UnAuthenticatedError('Authentication Invalid');
  };

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    const testUser = payload.userId === '63dc8b852b078cd6216aba10';
    req.user = { userId: payload.userId, testUser }
    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication INVALID');
  }
};

export default authenticateUser;
