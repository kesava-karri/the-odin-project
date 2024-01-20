function getComputerChoice() {
  let options = ["Rock", "Paper", "Scissors"];
  let randomInt = Math.floor(Math.random() * 3);
  return options[randomInt];
}

function playRound(playerSelection, computerSelection) {
  let player = playerSelection.toLowerCase();
  let computer = computerSelection.toLowerCase();
  if (player === computer) {
    return "That's a tie";
  } else {
    if ((player === "rock" && computer === "scissors")
      || (player === "paper" && computer === "rock")
      || (player === "scissors" && computer === "rock")) {
      return `You Win! ${playerSelection} beats ${computerSelection}`;
    } else {
      return `You Lose! ${computerSelection} beats ${playerSelection}`;
    }
  }
}

let playerScore = 0;
let computerScore = 0;

function game(result, playerScore, computerScore) {
  if (result.includes("Win!")) playerScore++;
  else if (result.includes("Lose!")) computerScore++;
  return [playerScore, computerScore];
}

const container = document.createElement("div");
const rock = document.createElement("button");
const paper = document.createElement("button");
const scissors = document.createElement("button");

rock.textContent = "Rock";
paper.textContent = "Paper";
scissors.textContent = "Scissors";

rock.style.cssText = "padding: 5px 10px; margin: 0px 5px; background-color: grey;";
paper.style.cssText = "padding: 5px 10px; margin: 0px 5px; background-color: white;";
scissors.style.cssText = "padding: 5px 10px; margin: 0px 5px; background-color: lightgray;";



container.appendChild(rock);
container.appendChild(paper);
container.appendChild(scissors);

document.body.appendChild(container);

const buttons = document.querySelectorAll("button");

const div = document.createElement("div");
div.className = "result";
document.body.appendChild(div);

let result;

buttons.forEach(btn => {
  btn.addEventListener('click', function(e) {
    const div = document.querySelector(".result");
    result = playRound(e.target.textContent, getComputerChoice());
    div.textContent = result;

    [playerScore, computerScore] = game(result, playerScore, computerScore);

    if (playerScore >= 5 || computerScore >= 5) {
      const winner = playerScore > computerScore ? "You" : "Computer"
      alert(`The winner of this game is: ${winner}`);
    }
  });
});

div.style.cssText = "display: flex; color: red; justify-content: center;";
div.style.cssText += "margin-top: 10px; font-family: monospace;"

container.style.cssText = "display: flex; justify-content: center; align-items: center";
container.style.cssText += "padding-top: 250px; ";