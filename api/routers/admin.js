const express = require('express');
const adminRouter = express.Router();

const { adminController } = require('../controllers/admin.controller');
const {
  authenticationMiddleware,
  authorizationMiddleware,
} = require('../middlewares/auth.middleware');

adminRouter.post(
  '/register',
  authenticationMiddleware,
  authorizationMiddleware,
  adminController.register
);
adminRouter.post('/login', adminController.login);
adminRouter.get('/', authenticationMiddleware, adminController.profile);

module.exports = { adminRouter };
