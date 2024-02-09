let user = new Object();

user.name = "John";
user.surname = "Smith";

user[name] = "Pete";
delete user.name;

// -----------------------------------------
function isEmpty(obj) {
  let count = 0;
  for (let key in obj) {
    count++;
  }
  return count === 0;
}

// Alt appraoch
function isEmpty(obj) {
  for (let key in obj) {
    // if loop started then at least one property exist
    return false;
  }
  return true;
}
// -----------------------------------------

let salaries = {
  John: 100, 
  Ann: 160,
  Pete: 130,
}

function findSum(salaries) {
  let sum = 0;
  for (let key in salaries) {
    sum += salaries[key];
  }
  return sum;
}

console.log(findSum(salaries));
// -----------------------------------------

let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

function multiplyNumeric(menu) {
  for (let key in menu) {
    if (typeof menu[key] === 'number') {
      menu[key] *= 2;
    }
  }
}

multiplyNumeric(menu);
console.log(menu);
