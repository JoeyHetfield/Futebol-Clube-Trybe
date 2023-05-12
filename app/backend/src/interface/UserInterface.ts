import { Request } from 'express';

export type UserType = {
  id: number
  email: string
  role: string
};

interface UserInterface extends Request {
  user?: UserType
}

export default UserInterface;
