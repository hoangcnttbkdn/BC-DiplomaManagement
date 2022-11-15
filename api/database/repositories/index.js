const { dataSource } = require('../../configs/connect-database');

const adminRepository = dataSource.getRepository('Admin');
const diplomaRepository = dataSource.getRepository('Diploma');

module.exports = { adminRepository, diplomaRepository };
