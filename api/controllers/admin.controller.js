const { StatusCodes } = require('http-status-codes');

const { Admin } = require('../database/models/admin');
const { adminRepository } = require('../database/repositories');
const { comparePassword, hashPassword } = require('../utils/hash-password');
const { getAccessToken } = require('../utils/jwt');

const adminController = {
  register: async (req, res) => {
    try {
      const { username, password, role } = req.body;
      const user = await adminRepository.findOne({
        where: { username },
      });
      if (user) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Username is exist!' });
        return;
      }
      await adminRepository.save(
        new Admin(username, hashPassword(password), role)
      );
      res.status(StatusCodes.OK).json({ message: 'Register admin success!' });
    } catch (error) {
      console.log(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await adminRepository.findOne({
        where: { username },
      });
      if (user && comparePassword(password, user.password)) {
        res.status(StatusCodes.OK).json({
          accessToken: getAccessToken({
            id: user.id,
            username,
            role: user.role,
          }),
          username,
        });
      } else {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Username or password is incorrect!' });
      }
    } catch (error) {
      console.log(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },
  profile: async (req, res) => {
    res.status(StatusCodes.OK).json({ id: req.userId, username: req.username });
  },
};

module.exports = { adminController };
