let container = document.createElement("div");
let div = document.createElement("div");
div.classList.add("mainContainer");
container.classList.add("gridContainer");
div.appendChild(container);
document.body.appendChild(div);

function createGrid(numOfSquares = 50) {
  let container = document.querySelector(".gridContainer");
  const gridSize = numOfSquares * numOfSquares;
  
  const width = 800;
  const height = 700;
  const widthInnerSquare = String(width / numOfSquares).concat("px");
  const heightInnerSquare = String(height / numOfSquares).concat("px");

  for (let i = 0; i < gridSize; i++) {
    const innerSquare = document.createElement("div");
    innerSquare.style.width = widthInnerSquare;
    innerSquare.style.height = heightInnerSquare;
    innerSquare.classList.add("innerSquare");

    container.appendChild(innerSquare);

    innerSquare.addEventListener('mouseover', function (e) {
      e.currentTarget.classList.add("mouseover");
    });
  }
}

// Create default 16 x 16 grid of square divs
createGrid();

const btn = document.createElement("button");
btn.classList.add("btn");
btn.textContent = "Click here to create a new grid";

let numOfSquares = 0;
btn.onclick = () => {
  numOfSquares = Number(
    prompt("Enter the number of squares you would like per side for the new grid")
  );
  if (numOfSquares <= 0 || numOfSquares > 100) {
    numOfSquares = Number(
      prompt("Choose from the inclusive limit  [1, 100] :), please re-enter")
    );
  }
  // Remove the existing squares :)
  container = document.querySelector(".gridContainer");
  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }
  createGrid(numOfSquares);
};
div.insertBefore(btn, container);
