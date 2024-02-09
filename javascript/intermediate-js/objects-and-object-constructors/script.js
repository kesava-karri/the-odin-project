function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + " pages, "
      + (this.isRead 
        ? "read it"
        : "not read yet");
  }
}

const book = new Book("The Hobbit","J.R.R. Tolkien", 295, false);

alert(book.info());

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function() {
  console.log(`Hello, I'm ${this.name}!`);
}

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

Player.prototype.getMarker = function() {
  console.log(`My marker is '${this.marker}'`);
};

// Object.prototype
console.log("Before using set prototype: ", Object.getPrototypeOf(Player.prototype));

Object.setPrototypeOf(Player.prototype, Person.prototype);

// Person.prototype
console.log("After using set prototype: ", Object.getPrototypeOf(Player.prototype));

const player1 = new Player('alex', 'X');


// Now Player object can access both both, since Person's prototype is added
// to the chain using setPrototypeOf()
player1.sayName();

player1.getMarker();

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

let animal = {
  jumps: null
};
let rabbit = {
  // Using __proto__ is considered legacy & not peferred
  __proto__: animal,
  jumps: true
};

alert( rabbit.jumps ); // true (1)

delete rabbit.jumps;

alert( rabbit.jumps ); // null (2)

delete animal.jumps;

alert( rabbit.jumps ); // undefined (3)

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Need pockets -> bed -> table -> head property lookup
let head = {
  glasses: 1
};

let table = {
  pen: 3,
  __proto__ : head,
};

let bed = {
  sheet: 1,
  pillow: 2,
  __proto__ : table,
};

let pockets = {
  money: 2000,
  __proto__ : bed,
};

alert(pockets.pen); // 3
alert(bed.glasses); // 1
alert(table.money); // undefined

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);

    // this.stomach = [food];
  }
};

let speedy = {
  stomach: [],
  __proto__: hamster
};

let lazy = {
  stomach: [],
  __proto__: hamster
};

// This one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// This one also has it, ~why? fix please.~
alert( lazy.stomach ); // apple