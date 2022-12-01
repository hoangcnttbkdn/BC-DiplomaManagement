const express = require('express');
const uploadRouter = express.Router();

const { uploadController } = require('../controllers/upload.controller');
const {
  authenticationMiddleware,
  multerUploadMiddleware,
} = require('../middlewares');

uploadRouter.post(
  '/',
  authenticationMiddleware,
  multerUploadMiddleware,
  uploadController.upload
);

module.exports = { uploadRouter };
