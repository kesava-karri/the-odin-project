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
      || (player === "paper" && computer == "rock")
      || (player === "scissors" && computer === "rock")) {
      return `You Win! ${playerSelection} beats ${computerSelection}`;
    } else {
      return `You Lose! ${computerSelection} beats ${playerSelection}`;
    }
  }
}

function game() {
  let playerScore = 0;
  let computerScore = 0;
  
  for (let i = 0; i < 5; i++) {
    const playerSelection = prompt("Make your play from the options rock, paper, scissors [case-insensitive]: ");
    const computerSelection = getComputerChoice();

    result = playRound(playerSelection, computerSelection);
    console.log(result);
    alert(result);
    if (result.includes("Win!")) playerScore++;
    else if (result.includes("Lose!")) computerScore++;
  }
  const winner = () => {
    if (playerScore > computerScore) return "You";
    else if (computerScore > playerScore) return "Computer";
    else return "That's a tie";
  }
  return `The winner of this best-of-five game: ${winner()}`;
}

alert(game());