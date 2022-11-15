const typeorm = require('typeorm');

const dataSource = new typeorm.DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [
    require('../database/entities/admin.js'),
    require('../database/entities/diploma.js'),
  ],
});

const connectDB = async () => {
  try {
    await dataSource.initialize();
    console.log('Connect DB success');
  } catch (err) {
    console.log(err);
    console.log('Connect DB fail');
  }
};

module.exports = { dataSource, connectDB };
