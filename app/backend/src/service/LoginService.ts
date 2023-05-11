import UserModel from '../model/UserModel';
import ErrorFile from '../utils/ErrorFile';
import Jwt from '../utils/auth';

class LoginService {
  constructor(private userModel = new UserModel()) {}

  async login(mail: string, password: string) {
    const user = await this.userModel.getUserByMail(mail);
    if (!user) {
      throw new ErrorFile('User not found', 404);
    }
    if (user.password !== password) {
      throw new ErrorFile('Wrong password', 401);
    }
    const token = Jwt.createToken({ id: user.id, mail });
    return token;
  }
}

export default LoginService;
