const express = require('express');
const diplomaRouter = express.Router();

const { diplomaController } = require('../controllers/diploma.controller');
const {
  authenticationMiddleware,
  authorizationMiddleware,
} = require('../middlewares/auth.middleware');

diplomaRouter.get(
  '/sync',
  authenticationMiddleware,
  authorizationMiddleware,
  diplomaController.syncData
);
diplomaRouter.get('/:code', diplomaController.getDiplomaByCode);
diplomaRouter.get('/', diplomaController.getAllDiplomas);

diplomaRouter.post(
  '/',
  authenticationMiddleware,
  diplomaController.createDiploma
);
diplomaRouter.put(
  '/:code',
  authenticationMiddleware,
  diplomaController.updateDiploma
);
diplomaRouter.delete(
  '/:code',
  authenticationMiddleware,
  authorizationMiddleware,
  diplomaController.deleteDiploma
);

module.exports = { diplomaRouter };
