const sumAll = function(arg1, arg2) {
  if (typeof arg1 != "number" 
      || typeof arg2 != "number"
      || arg1 < 0
      || arg2 < 0) {
     return "ERROR";
  }
  max = Math.max(arg1, arg2);
  // sum of first natural numbers
  return (max * (max + 1)) / 2;
  
  // Another approach would be thru looping
};

// Do not edit below this line
module.exports = sumAll;
