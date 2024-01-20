let container = document.createElement("div");
container.id = "gridContainer";
container.style.border = "2px solid #faa12d";
// Assuming each sqauare of 20x20
// and for 16 squares the width & height be 20 * 16 = 320
// 320 + 16 * 2 (border on 2 sides)
container.style.width = "352px";
container.style.maxWidth = "1000px";
container.style.height = "352px";
container.style.maxHeight = "1000px";
// container.style.marginLeft = "250px";
// container.style.marginTop = "250px";
container.style.cssText += "display: flex; flex-wrap: wrap;";

function createGrid(numOfSquares) {
  let container = document.createElement("div");
  container.style.maxWidth = "1000px";
  container.style.maxHeight = "1000px";
  container.style.border = "2px solid #faa12d";
  container.style.cssText += "display: flex; flex-wrap: wrap;";
  container.id = "gridContainer";
  // numOfSquares = 30 on each side
  // 20 * 20 + 20 * 2
  const gridSize = numOfSquares * numOfSquares;
  const newDimension = String(numOfSquares * (20 + 2)).concat("px");
  container.style.width = newDimension;
  container.style.height = newDimension;
  for (let i = 0; i < gridSize; i++) {
    const innerSquare = document.createElement("div");
    innerSquare.style.width = "20px";
    innerSquare.style.height = "20px";
    innerSquare.style.border = "1px solid #faeede";
    innerSquare.style.display = "flex";
    container.appendChild(innerSquare);

    innerSquare.addEventListener('mouseover', function (e) {
      e.currentTarget.style.cssText += "background-color: #0c9cf5;";
    });
  }
  return container;
}

// Create 16 x 16 grid of square divs
container = createGrid(16);
document.body.appendChild(container);

const btn = document.createElement("button");
btn.textContent = "Click here to create a new grid";
let numOfSquares = 0;
btn.onclick = () => {
  numOfSquares = Number(prompt("Enter the number of squares you would like per side for the new grid"));
  if (numOfSquares < 0 || numOfSquares > 100) {
    numOfSquares = Number(prompt("There's a limit of 100 squares per side :), please re-enter"));
  }
  // Remove the existing squares :)
  container = document.querySelector("#gridContainer");
  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }
  newGridContainer = createGrid(numOfSquares);
  console.log(newGridContainer.childElementCount);
  container.replaceWith(newGridContainer);
};

document.body.insertBefore(btn, container);
