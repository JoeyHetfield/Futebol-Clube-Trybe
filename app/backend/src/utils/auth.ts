import jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

const configJWT = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

class Jwt {
  static createToken = (payload) => {
    const token = jwt.sign(payload, secretKey, configJWT);
    console.log(token);
    return token;
  };

  static validateToken = (token) => {
    const isValid = jwt.verify(token, secretKey);
    return isValid;
  };
}

export default Jwt;
