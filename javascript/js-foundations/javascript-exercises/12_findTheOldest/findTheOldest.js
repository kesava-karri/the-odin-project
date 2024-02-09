const findTheOldest = function(people) {
  let ageGap = 0;
  let answer;
  people.forEach(person => {
    currentAge = person.yearOfDeath - person.yearOfBirth;
    if (person.yearOfDeath === undefined) {
      currentAge = new Date().getFullYear() - person.yearOfBirth;
    }
    if (currentAge > ageGap) {
      ageGap = currentAge;
      answer = person;
    }
  });
  return answer;
};

// Do not edit below this line
module.exports = findTheOldest;
