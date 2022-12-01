const { authenticationMiddleware } = require('./auth.middleware');
const { multerUploadMiddleware } = require('./upload.middleware');

module.exports = { authenticationMiddleware, multerUploadMiddleware };
