import User from '../database/models/User';

class UserModel {
  constructor(private user = User) {}

  async getUserByMail(mail: string) {
    const user = await this.user.findOne({ where: { mail } });
    return user;
  }
}

export default UserModel;
