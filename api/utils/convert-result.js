const { Diploma } = require('../database/models/diploma');

const convertJson = (result) => {
  return JSON.parse(result.toString());
};

const convertResult = (data) => {
  return Array.from(data).map((item) => {
    return new Diploma(
      item['ID'],
      item['Fullname'],
      item['DateOfBirth'],
      item['Gender'],
      item['Certificate'],
      item['Speciality'],
      item['GraduationYear'],
      item['School'],
      item['Rank'],
      item['ModeOfStudy'],
      item['RegNo'],
      item['UrlImage'],
      item['Status'] === 'true'
    );
  });
}

module.exports = { convertJson, convertResult };
