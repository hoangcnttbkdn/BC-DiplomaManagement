const { hashSync, compareSync } = require('bcryptjs');

const saltRounds = 10;

const hashPassword = (password) => {
  return hashSync(password, saltRounds);
};

const comparePassword = (password, dbPassword) => {
  return compareSync(password, dbPassword);
};

module.exports = { hashPassword, comparePassword };
