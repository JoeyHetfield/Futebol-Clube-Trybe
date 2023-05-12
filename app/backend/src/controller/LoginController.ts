import { Request, Response } from 'express';
import LoginService from '../service/LoginService';

class LoginController {
  constructor(private loginService = new LoginService()) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.loginService.login(email, password);
    res.status(200).json({ token });
  }

  static async loginRole(req: Request, res: Response) {
    const { role } = req.body;
    res.status(200).json({ role });
  }
}

export default LoginController;
