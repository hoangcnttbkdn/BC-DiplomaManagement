class Diploma {
  constructor(
    code,
    fullName,
    dateOfBirth,
    gender,
    certificate,
    speciality,
    graduationYear,
    school,
    rank,
    modeOfStudy,
    regNo,
    urlImage,
    status
  ) {
    this.code = code;
    this.fullName = fullName;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.certificate = certificate;
    this.speciality = speciality;
    this.graduationYear = graduationYear;
    this.school = school;
    this.rank = rank;
    this.modeOfStudy = modeOfStudy;
    this.regNo = regNo;
    this.urlImage = urlImage;
    this.status = status;
  }
}

module.exports = { Diploma };
