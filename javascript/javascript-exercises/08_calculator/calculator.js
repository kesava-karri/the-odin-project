const add = function(num1, num2) {
	return num1 + num2;
};

const subtract = function(num1, num2) {
	return num1 - num2;
};

const sum = function(array) {
	let sumOfNums = 0;
  array.reduce()
  array.forEach(num => {
    sumOfNums += num;
  });
  return sumOfNums;
};

const multiply = function(array) {
  let product = 1;
  // for (const item in array) {
  //   product *= item;
  // }
  array.filter(item => {
    product *= item;
  });
  return product;
};

const power = function(base, exponent) {
  let raisedPower = 1;
  do {
    raisedPower *= base;
  } while (--exponent > 0);
  return raisedPower;
  // return Math.pow(base, exponent);
};

const factorial = function(num) {
  if (num == 0 || num == 1) return 1;
  // n! = n * n-1 * n-2 * ... * 3 * 2 * 1
  let ans = num;
	while (num > 1) {
    ans *= num - 1;
    num--;
  }
  return ans;
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
