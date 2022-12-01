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

adminRouter.get('/profile', authenticationMiddleware, adminController.profile);
adminRouter.get('/:id', authenticationMiddleware, adminController.getById);
adminRouter.get('/', authenticationMiddleware, adminController.getAll);

adminRouter.put(
  '/:id',
  authenticationMiddleware,
  authorizationMiddleware,
  adminController.update
);

adminRouter.delete(
  '/:id',
  authenticationMiddleware,
  authorizationMiddleware,
  adminController.delete
);

module.exports = { adminRouter };
