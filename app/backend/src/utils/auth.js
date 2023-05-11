import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

const configJWT = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (payload) => {
  const token = jwt.sign(payload, secretKey, configJWT);
  console.log(token);
  return token;
};

const validateToken = (token) => {
  const isValid = jwt.verify(token, secretKey);
  return isValid;
};

const decodeToken = (token) => {
  const decoded = jwt.decode(token);
  return decoded;
};

export default {
  createToken,
  validateToken,
  decodeToken,
};
