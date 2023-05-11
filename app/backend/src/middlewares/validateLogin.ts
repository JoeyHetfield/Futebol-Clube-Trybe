import { Request, Response, NextFunction } from 'express';
import loginSchema from '../utils/joi';

export default (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    const { type } = error.details[0];
    if (type === 'string.email' || type === 'string.min') {
      return res.status(401).json({ message: error.message });
    }
    if (type === 'any.required' || type === 'string.empty') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }

  next();
};
