import UserModel from '../model/UserModel';
import ErrorFile from '../utils/ErrorFile';
import Jwt from '../utils/auth';

class LoginService {
  constructor(private userModel = new UserModel(), private jwt = new Jwt()) {}

  async login(email: string, password: string) {
    const user = await this.userModel.getUserByMail(email);
    if (!user || !password) {
      throw new ErrorFile('All fields must be filled', 400);
    }
    const token = this.jwt.createToken({ id: user.id, email });
    return token;
  }
}

export default LoginService;
