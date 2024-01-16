/*
  This function provides a random whole number between 0 and upperLimit
*/
export function randInt(upperLimit) {
  let randomInt = Math.floor(Math.random() * upperLimit);
  return randomInt;
}

/*
  Function which returns the least of two numbers a and b.
*/
export function min(a, b) {
  return a < b ? a : b;
}

/*
  A function that returns x to the power of n.
*/ 
function pow(x, n) {
  return x ** n;
  // return Math.pow(x, n);
}


/*
  FizzBuzz game
*/
function fizzBizz() {
  let number = parseInt(prompt("Please enter the number you would like to FizzBuzz upto: "));

  for (let i = 1; i <= number; i++) {
    if (i % 3 == 0 && i % 5 == 0) {
      console.log("FizzBuzz");
    } else if (i % 3 == 0) {
      console.log("Fizz");
    } else if (i % 5 == 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}