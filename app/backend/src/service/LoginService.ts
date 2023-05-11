import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';
import UserModel from '../model/UserModel';
import ErrorFile from '../utils/ErrorFile';
import Jwt from '../utils/auth';

class LoginService {
  constructor(private userModel = new UserModel(), private jwt = new Jwt()) {}

  async login(email: string, password: string) {
    const user = await this.userModel.getUserByMail(email);

    if (!user || !LoginService.isPassword(user, password)) {
      throw new ErrorFile('Invalid email or password', 401);
    }
    const token = this.jwt.createToken({ id: user.id, email });
    return token;
  }

  static isPassword(user: User, password: string) {
    return bcrypt.compareSync(password, user.password);
  }
}

export default LoginService;
