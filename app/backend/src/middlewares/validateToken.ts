import { Request, Response, NextFunction } from 'express';
import Auth from '../utils/AuthClass';
// apenas pra testar
export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const validateToken = Auth.validateToken(token);

  if (!validateToken) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
};
