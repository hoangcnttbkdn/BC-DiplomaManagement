const { diplomaRouter } = require('./diploma');
const { adminRouter } = require('./admin');

const route = (app) => {
  app.use('/diplomas', diplomaRouter);
  app.use('/admins', adminRouter);
};

module.exports = { route };
