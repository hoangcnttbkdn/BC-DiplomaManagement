const { diplomaRouter } = require('./diploma');
const { adminRouter } = require('./admin');
const { uploadRouter } = require('./upload');

const route = (app) => {
  app.use('/diplomas', diplomaRouter);
  app.use('/admins', adminRouter);
  app.use('/upload', uploadRouter);
};

module.exports = { route };
