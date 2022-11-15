class Diploma {
  constructor(
    code,
    fullName,
    dateOfBirth,
    certificate,
    speciality,
    graduationYear,
    school,
    rank,
    modeOfStudy,
    regNo,
    urlImage
  ) {
    this.code = code;
    this.fullName = fullName;
    this.dateOfBirth = dateOfBirth;
    this.certificate = certificate;
    this.speciality = speciality;
    this.graduationYear = graduationYear;
    this.school = school;
    this.rank = rank;
    this.modeOfStudy = modeOfStudy;
    this.regNo = regNo;
    this.urlImage = urlImage;
  }
}

module.exports = { Diploma };
