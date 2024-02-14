function makeAdding (firstNumber) {
  // "first" is scoped within the makeAdding function
  const first = firstNumber;
  return function resulting (secondNumber) {
    // "second" is scoped within the resulting function
    const second = secondNumber;
    return first + second;
  }
}
const add5 = makeAdding(5);
console.log(add5(2)) // logs 7

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

const dog = 'snickers';
function logDog() {
  console.log(dog);
}
function go() {
  const dog = 'sunny';
  logDog();
}
go();

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

var proto = {prototype: "prototype"};
var obj = Object.create(proto);
