const express = require('express');
const diplomaRouter = express.Router();

const { diplomaController } = require('../controllers/diploma.controller');

diplomaRouter.get('/sync', diplomaController.syncData);
diplomaRouter.get('/:code', diplomaController.getDiplomaByCode);
diplomaRouter.get('/', diplomaController.getAllDiplomas);

diplomaRouter.post('/', diplomaController.createDiploma);
diplomaRouter.put('/', diplomaController.updateDiploma);
diplomaRouter.delete('/:code', diplomaController.deleteDiploma);

module.exports = { diplomaRouter };
