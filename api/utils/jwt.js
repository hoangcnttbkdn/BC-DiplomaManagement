const { sign, verify } = require('jsonwebtoken');

const getToken = (req) => {
  return req.headers['authorization']
    ? req.headers['authorization'].split(' ')[1]
    : '';
};

const getAccessToken = (data) => {
  return sign(data, process.env.ACCESS_TOKEN_SECRET || '', {
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });
};

const verifyToken = (token) => {
  return verify(token, process.env.ACCESS_TOKEN_SECRET || '');
};

module.exports = { getToken, getAccessToken, verifyToken };
