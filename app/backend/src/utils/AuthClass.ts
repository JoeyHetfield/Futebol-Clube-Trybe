import Jwt from './auth';

class Auth {
  private jwt: Jwt;

  constructor() {
    this.jwt = new Jwt();
  }

  validateToken(token: string) {
    return this.jwt.validateToken(token);
  }
}

export default new Auth();
