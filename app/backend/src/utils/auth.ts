import jwt = require('jsonwebtoken');

class Jwt {
  private _secretKey = process.env.JWT_SECRET || 'secret';

  private _configJWT: jwt.SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  constructor(private _jwt = jwt) {}

  createToken = (payload: string | object) => {
    const token = jwt.sign(payload, this._secretKey, this._configJWT);
    console.log(token);
    return token;
  };

  validateToken = <T>(token: string): T => {
    const isValid = jwt.verify(token, this._secretKey);
    return isValid as T;
  };
}

export default Jwt;
