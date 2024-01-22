const OPERATORS = ["+", "-", "*", "/", "="];

const h1 = document.createElement("h1");
h1.textContent = "Calculator";
document.body.appendChild(h1);

const container = document.createElement("div");
container.classList.add("mainContainer");
document.body.appendChild(container);

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
// rounded divided upto 2 decimal points
const divide = (a, b) => Math.floor(a/b * 100) / 100;

const input1 = document.createElement("input");
input1.classList.add("input1");
input1.placeholder = 2;
container.appendChild(input1);

const input2 = document.createElement("input");
input2.classList.add("input2");
input2.placeholder = 3;
container.appendChild(input2);

// TODO: Change operator
// hard coding operator for now
const operator = document.createElement("p");
operator.classList.add("operator");
operator.textContent = "+";
container.insertBefore(operator, input2);

const operate = (operator, num1, num2) => {
  switch (operator) {
    case OPERATORS[0]: // "+"
      return add(num1, num2);
    case OPERATORS[1]: // "-"
      return subtract(num1, num2);
    case OPERATORS[2]: // "*"
      return multiply(num1, num2);
    case OPERATORS[3]: // "/"
      return divide(num1, num2);
  }
}

const calc = document.createElement("div");
calc.classList.add("calc");
const numbers = document.createElement("div");
numbers.classList.add("numbers");

// Create buttons for 1 to 9
for (let i = 1; i <= 9; i++) {
  const btn = document.createElement("button");
  btn.classList.add("btn");
  btn.textContent = i;
  numbers.appendChild(btn);

  btn.addEventListener('click', (e) => {
    input1.value += btn.textContent;
  });
}

// Clear button
const btnClear = document.createElement("button");
btnClear.classList.add("btn");
btnClear.classList.add("btn-clear");
btnClear.textContent = "CLR";
numbers.appendChild(btnClear);

// Button 0 to place it at the bottom
const btn = document.createElement("button");
btn.classList.add("btn");
btn.classList.add("btn-zero");
btn.textContent = 0;
numbers.appendChild(btn);
calc.appendChild(numbers);
document.body.appendChild(calc);

// Equal sign
const btnEquals = document.createElement("button");
btnEquals.classList.add("btn");
btnEquals.textContent = OPERATORS[4];
numbers.appendChild(btnEquals);

const operatorsContainer = document.createElement("div");
operatorsContainer.classList.add("operatorsContainer");
for (let i = 0; i < 4; i++) {
  const btn = document.createElement("button");
  btn.textContent = OPERATORS[i];
  btn.classList.add("btn");
  operatorsContainer.appendChild(btn);
}
calc.appendChild(operatorsContainer);
