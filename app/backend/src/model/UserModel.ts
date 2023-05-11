import User from '../database/models/User';

class UserModel {
  constructor(private _user = User) {}

  async getUserByMail(email: string) {
    const user = await this._user.findOne({ where: { email } });
    return user;
  }
}

export default UserModel;
