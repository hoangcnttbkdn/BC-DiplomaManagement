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
  profile: (req, res) => {
    res
      .status(StatusCodes.OK)
      .json({ id: req.userId, username: req.username, role: req.userRole });
  },
  getAll: async (req, res) => {
    try {
      const users = await adminRepository.find({
        select: { id: true, username: true, role: true },
      });
      res.status(StatusCodes.OK).json(users);
    } catch (error) {
      console.log(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const users = await adminRepository.findOne({
        where: { id },
        select: { id: true, username: true, role: true },
      });
      res.status(StatusCodes.OK).json(users);
    } catch (error) {
      console.log(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      await adminRepository
        .createQueryBuilder()
        .update()
        .set({ ...req.body })
        .where('id = :id')
        .setParameters({ id })
        .execute();
      res.status(StatusCodes.OK).json({ message: 'Update admin success!' });
    } catch (error) {
      console.log(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await adminRepository
        .createQueryBuilder()
        .delete()
        .where('id = :id')
        .setParameters({ id })
        .execute();
      res.status(StatusCodes.OK).json({ message: 'Delete admin success!' });
    } catch (error) {
      console.log(error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },
};

module.exports = { adminController };
