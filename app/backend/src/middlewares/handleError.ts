import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import ErrorFile from '../utils/ErrorFile';

export default (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ErrorFile) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  if (err instanceof TokenExpiredError) {
    return res.status(401).json({ message: 'Token expired' });
  }

  return res.status(500).json({ message: 'Internal Server Error' });
};
