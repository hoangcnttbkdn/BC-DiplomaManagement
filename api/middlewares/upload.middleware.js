const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const Multer = require('multer');

const multerUploadMiddleware = Multer({
  storage: Multer.memoryStorage(),
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      callback(null, true);
    } else {
      callback(
        createError(
          StatusCodes.BAD_REQUEST,
          'Only .png, .jpg and .jpeg format allowed!'
        )
      );
    }
    if (
      +req.headers['content-length'] >
      +process.env.FILE_SIZE_LIMIT * 1024 * 1024
    ) {
      callback(createError(StatusCodes.REQUEST_TOO_LONG, 'File too large'));
    }
  },
}).single('image');

module.exports = { multerUploadMiddleware };
