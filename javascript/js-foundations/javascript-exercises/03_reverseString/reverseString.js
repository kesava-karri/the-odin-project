const reverseString = function(stringToBeReversed) {
  let result = "";
  for (let i = stringToBeReversed.length - 1; i >= 0 ; i--) {
    result += stringToBeReversed.charAt(i);
  }
  return result;
};

// Do not edit below this line
module.exports = reverseString;
