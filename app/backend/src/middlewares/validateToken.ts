import { Response, NextFunction } from 'express';
import UserInterface, { UserType } from '../interface/UserInterface';
import Jwt from '../utils/auth';

export default (req: UserInterface, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const validateToken = new Jwt().validateToken<UserType>(token);

  req.user = validateToken;

  next();
};
