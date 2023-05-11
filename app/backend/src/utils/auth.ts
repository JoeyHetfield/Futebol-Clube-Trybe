import jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET as string;

const configJWT: jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

class Jwt {
  static createToken = (payload: string) => {
    const token = jwt.sign(payload, secretKey, configJWT);
    console.log(token);
    return token;
  };

  static validateToken = (token: string) => {
    const isValid = jwt.verify(token, secretKey);
    return isValid;
  };
}

export default Jwt;
