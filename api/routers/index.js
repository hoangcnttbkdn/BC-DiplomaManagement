const { diplomaRouter } = require('./diploma');

const route = (app) => {
  app.use('/diplomas', diplomaRouter);
};

module.exports = { route };
