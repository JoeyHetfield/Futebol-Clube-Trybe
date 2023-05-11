import { Request, Response, NextFunction } from 'express';
import ErrorFile from '../utils/ErrorFile';

export default (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ErrorFile) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Internal Server Error' });
};
