const leapYears = function(year) {
  // A leap year is divisible by 4;
  // not divisible by 100 except when divisible by 400;
  if (year % 400 === 0 || year % 100 !== 0) {
    return true;
  }
  return year % 4 === 0;
};

// Do not edit below this line
module.exports = leapYears;
