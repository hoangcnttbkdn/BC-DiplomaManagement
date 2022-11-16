const { StatusCodes } = require('http-status-codes');
const { TokenExpiredError, JsonWebTokenError } = require('jsonwebtoken');

const { getToken, verifyToken } = require('../utils/jwt');

const authenticationMiddleware = (req, res, next) => {
  try {
    const { username, id, role } = verifyToken(getToken(req));
    req.username = username;
    req.userId = id;
    req.userRole = role;
    next();
  } catch (error) {
    console.log(error);
    if (
      error instanceof TokenExpiredError ||
      error instanceof JsonWebTokenError
    ) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: error.message });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message:
          error instanceof Error ? error.message : 'Some error happened!',
      });
    }
  }
};

const authorizationMiddleware = (req, res, next) => {
  try {
    if (req.userRole !== 'superadmin') {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ messgae: 'Permission denied' });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error instanceof Error ? error.message : 'Some error happened!',
    });
  }
};

module.exports = { authenticationMiddleware, authorizationMiddleware };
