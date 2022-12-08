const { Diploma } = require('../database/models/diploma');

const convertJson = (result) => {
  return JSON.parse(result.toString());
};

const convertDiplomaType = (diploma) => {
  return new Diploma(
    diploma['ID'],
    diploma['Fullname'],
    diploma['DateOfBirth'],
    diploma['Gender'],
    diploma['Certificate'],
    diploma['Speciality'],
    diploma['GraduationYear'],
    diploma['School'],
    diploma['Rank'],
    diploma['ModeOfStudy'],
    diploma['RegNo'],
    diploma['UrlImage'],
    diploma['Status'] === 'true'
  );
};

const convertResult = (data) => {
  return Array.from(data).map((item) => {
    return convertDiplomaType(item);
  });
};

module.exports = { convertJson, convertDiplomaType, convertResult };
