import User from '../database/models/User';

class UserModel {
  constructor(private user = User) {}
}

export default UserModel;
