const EntitySchema = require('typeorm').EntitySchema;
const Diploma = require('../models/diploma').Diploma;

module.exports = new EntitySchema({
  tableName: 'diplomas',
  name: 'Diploma',
  target: Diploma,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    code: {
      type: 'varchar',
      unique: true,
    },
    fullName: {
      type: 'varchar',
      name: 'full_name',
    },
    dateOfBirth: {
      type: 'varchar',
      name: 'date_of_birth',
    },
    gender: {
      type: 'varchar',
    },
    certificate: {
      type: 'varchar',
    },
    speciality: {
      type: 'varchar',
    },
    graduationYear: {
      type: 'varchar',
      name: 'graduation_year',
    },
    school: {
      type: 'varchar',
    },
    rank: {
      type: 'varchar',
    },
    modeOfStudy: {
      type: 'varchar',
      name: 'mode_of_study',
    },
    regNo: {
      type: 'varchar',
      name: 'reg_no',
    },
    urlImage: {
      type: 'text',
      name: 'url_image',
    },
    status: {
      type: 'boolean',
    },
  },
});
