const convertToCelsius = function(tempInF) {
  // (F − 32) × 5/9 = C
  return Math.round((5/9) * (tempInF - 32) * 10) / 10;
};

const convertToFahrenheit = function(tempInC) {
// F = C x 9/5 + 32
return Math.round((tempInC * (9/5) + 32) * 10) / 10;
};

// Do not edit below this line
module.exports = {
  convertToCelsius,
  convertToFahrenheit
};
