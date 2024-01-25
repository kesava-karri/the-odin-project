const OPERATORS = ["+", "-", "*", "/", "="];
const NAME = "kesava-karri";
const GITHUB_URL = "https://github.com/kesava-karri";

const h1 = document.createElement("h1");
h1.textContent = "Calculator";
document.body.appendChild(h1);

const container = document.createElement("div");
container.classList.add("mainContainer");
document.body.appendChild(container);

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) alert("Trying to divide w zero, Will result in infinity ;)")
  // rounded divided upto 2 decimal points
  return Math.floor(a/b * 100) / 100;
};

const display = document.createElement("div");
const currEvalDisplay = document.createElement("div");
const numberDisplay = document.createElement("div");

currEvalDisplay.textContent = "0";
currEvalDisplay.classList.add("currEvalDisplay");
display.classList.add("display");
numberDisplay.textContent = "0";
container.appendChild(display);
display.appendChild(currEvalDisplay);
display.appendChild(numberDisplay);

const operate = (operator, num1, num2) => {
  // Convert strings to numbers
  num1 = Number(num1);
  num2 = +num2;

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

let num1 = "";
let num2 = "";
let displayVal = 0;

const calc = document.createElement("div");
calc.classList.add("calc");
const numbers = document.createElement("div");
numbers.classList.add("numbers");
container.appendChild(calc);

const borderContainer = document.createElement("div");
borderContainer.classList.add("borderContainer");
borderContainer.appendChild(display);
borderContainer.appendChild(calc);

container.appendChild(borderContainer);

// Create buttons for 1 to 9
for (let i = 1; i <= 9; i++) {
  const btn = document.createElement("button");
  btn.classList.add("btn");
  btn.textContent = i;
  numbers.appendChild(btn);

  btn.addEventListener('click', (e) => {
    if (numberDisplay.textContent === "0") {
      if (!num1 || !num2 || !operator) {
        numberDisplay.textContent = "";
      }
    }
    numberDisplay.textContent += e.target.textContent;
  });
}

// Clear button
const btnClear = document.createElement("button");
btnClear.classList.add("btn");
btnClear.classList.add("btn-clear");
btnClear.textContent = "CLR";
numbers.appendChild(btnClear);
btnClear.addEventListener('click', () => {
  numberDisplay.textContent = "0";
  currEvalDisplay.textContent = "0";
  num1 = "";
  num2 = "";
  operator = "";
});

// Button 0; not included in the loop to place it at the bottom
const btn = document.createElement("button");
btn.classList.add("btn");
btn.classList.add("btn-zero");
btn.textContent = 0;
numbers.appendChild(btn);
calc.appendChild(numbers);
btn.addEventListener('click', (e) => {
  numberDisplay.textContent += e.target.textContent;
});

// Equal sign
const btnEquals = document.createElement("button");
btnEquals.classList.add("btn");
btnEquals.textContent = OPERATORS[4];
numbers.appendChild(btnEquals);
btnEquals.addEventListener('click', () => {
  if (num1 && !num2) {
    num2 = numberDisplay.textContent;
    currEvalDisplay.textContent = numberDisplay.textContent;
  }
  if (operator && num1 && num2) {
    numberDisplay.textContent = operate(operator, num1, num2);
    currEvalDisplay.textContent = numberDisplay.textContent;
    num1 = "";
    num2 = "";
    operator = "";
  }
});

// Operations
let operator = "";
const operatorsContainer = document.createElement("div");
operatorsContainer.classList.add("operatorsContainer");
for (let i = 0; i < 4; i++) {
  const btn = document.createElement("button");
  btn.textContent = OPERATORS[i];
  btn.classList.add("btn");
  btn.classList.add("operations");
  operatorsContainer.appendChild(btn);

  btn.addEventListener('click', (e) => {
    if (!operator) {
      num1 = numberDisplay.textContent;
      operator = e.target.textContent;
      currEvalDisplay.textContent = numberDisplay.textContent;
      numberDisplay.textContent = "";
    } else {
      num2 = numberDisplay.textContent;
      if (operator !== e.target.textContent) {
        numberDisplay.textContent = operate(operator, num1, num2);
        currEvalDisplay.textContent = numberDisplay.textContent;
        operator = e.target.textContent;
        num1 = numberDisplay.textContent;
        num2 = "";
        numberDisplay.textContent = "";
      }
    }
  });
}
calc.appendChild(operatorsContainer);

const footer = document.createElement("footer");
const link = document.createElement("a");
link.textContent = `${NAME}`;
link.href = `${GITHUB_URL}`;
link.target = "_blank";
link.rel = "noopener noreferrer";
footer.classList.add("footer");
footer.textContent = `Copyright © ${new Date().getFullYear()} `;
footer.appendChild(link);
container.appendChild(footer);
