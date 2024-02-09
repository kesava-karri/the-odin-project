// buttons is a node list
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener('click', () => {
    alert(button.id);
  });
});

// ------------------------------------------
/*
const btn = document.querySelector('#btn')
btn.addEventListener('click', function (e) {
  console.log(e.target);
  e.target.style.background = "cyan";
});
*/
// ------------------------------------------
// Using named functions
/*
function alertFunction() {
  alert("YAY! YOU DID IT!");
}
const btn = document.querySelector('#btn')

// METHOD 2
btn.onclick = alertFunction;

// METHOD 3
btn.addEventListener('click', alertFunction);
*/

// ------------------------------------------
// <!-- Method 3 -->
// const btn = document.querySelector("#btn");
// btn.addEventListener('click', () => {
//   alert("Hello World");
// });

// <!-- Method 2: -->
// const btn = document.querySelector("#btn");
// btn.onclick = () => alert("Hello World");
