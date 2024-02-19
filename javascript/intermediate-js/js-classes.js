
/*
* getters & setter property
*/
let user = {
  name: "John",
  surname: "Smith",

  // get fullName() {
  //   return `${this.name} ${this.surname}`;
  // },

  // set fullName(value) {
  //   [this.name, this.surname] = value.split(" ");
  // },

};
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
});
// set fullName is executed with the given value.
user.fullName = "Alice Cooper";

console.log(user.fullName);

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday );
alert( john.age );
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// class is a function
alert(typeof User); // function

// ...or, more precisely, the constructor method
alert(User === User.prototype.constructor); // true

// The methods are in User.prototype, e.g:
alert(User.prototype.sayHi); // the code of the sayHi method

// there are exactly two methods in the prototype
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
// -----------------------------------------------------------------------------
/* Summary

class MyClass {
  prop = value; // property

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter method
  set something(...) {} // setter method

  [Symbol.iterator]() {} // method with computed name (symbol here)
  // ...
}

*/


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

class Clock {
  constructor({ template }) {
    this.template = template;
  }

  render() {
    let date  = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);
    
      console.log(output);
  }

  stop() {
    clearInterval(timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  };
}

let clock = new Clock({template: 'h:m:s'});
clock.start;