const findTheOldest = function (array) {
  return array.reduce((oldest, currentPerson) => {
    console.log("oldest: ", oldest.yearOfBirth, oldest.yearOfDeath);
    console.log("currentPerson: ", currentPerson.yearOfBirth, currentPerson.yearOfDeath);
    const oldestAge = getAge(oldest.yearOfBirth, oldest.yearOfDeath);
    const currentAge = getAge(
      currentPerson.yearOfBirth,
      currentPerson.yearOfDeath
    );
    return oldestAge < currentAge ? currentPerson : oldest;
  });
};

const getAge = function (birth, death) {
  if (!death) {
    death = new Date().getFullYear();
  }
  return death - birth;
};

module.exports = findTheOldest;
