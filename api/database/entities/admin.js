const EntitySchema = require('typeorm').EntitySchema;
const Admin = require('../models/admin').Admin;

module.exports = new EntitySchema({
  tableName: 'admins',
  name: 'Admin',
  target: Admin,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    username: {
      type: 'varchar',
      unique: true,
    },
    password: {
      type: 'varchar',
    },
    role: {
      type: 'enum',
      enum: ['superadmin', 'admin'],
    },
  },
});
