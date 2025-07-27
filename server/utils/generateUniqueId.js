const generateStudentAndCourseUniqueId = (
  firstName,
  lastName,
  dateOfBirth,
  courseTitle
) => {
  if (!firstName || !lastName || !dateOfBirth) return null;

  const getAcronym = (courseTitle) => {
    return courseTitle
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
  };

  const courseAcronym = getAcronym(courseTitle);

  const currentYear = new Date().getFullYear().toString().slice(2, 4);
  const dobFormatted = dateOfBirth.replaceAll("-", "");

  const birthDate = dobFormatted.slice(6, 8);
  const birthYear = dobFormatted.slice(2, 4);

  // return `${firstName.slice(0, 1).toUpperCase()}${lastName
  //   .slice(0, 1)
  //   .toUpperCase()}_${courseAcronym}${birthDate}${birthYear}-${currentYear}`;
  return `${firstName.slice(0, 1).toUpperCase()}${lastName
    .slice(0, 1)
    .toUpperCase()}${birthDate}${courseAcronym}${currentYear}`;
};

const generateUserUniqueId = (firstName, lastName, dateOfBirth, gender) => {
  if (!firstName || !lastName || !dateOfBirth || !gender) return null;

  const currentYear = new Date().getFullYear().toString().slice(2, 4);
  const dobFormatted = dateOfBirth.replaceAll("-", "");

  const birthDate = dobFormatted.slice(6, 8);
  const birthYear = dobFormatted.slice(2, 4);
  const f_Gender = gender.slice(0, 1).toUpperCase();

  return `${currentYear}${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}${birthDate}${birthYear}_${f_Gender}`;
};

module.exports = { generateStudentAndCourseUniqueId, generateUserUniqueId };

//   const getAcronym = (courseName) => {
//     return courseName
//       .split(" ")
//       .map((word) => word[0].toUpperCase())
//       .join("");
//   };

//   const courseAcronym = getAcronym(CourseTitle);

//   return `${firstName.slice(0, 1).toUpperCase()}${lastName
//     .slice(0, 1)
//     .toUpperCase()}${courseAcronym}${dobFormatted}-${currentYear}${courseAcronym}`;

// Example Usage:
// const userId = generateUniqueId("John", "Doe", "2000-05-15", "basic of pythen");
// console.log(userId);

//   let lastSerial = localStorage.getItem("serialNumber")
//     ? parseInt(localStorage.getItem("serialNumber"))
//     : 0;

//   lastSerial += 1;
//   localStorage.setItem("serialNumber", lastSerial);

// ${lastSerial
//     .toString()
//     .padStart(3, "0")}
