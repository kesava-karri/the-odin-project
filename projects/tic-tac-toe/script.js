// tip: if you need only single instance of something then wrap the factory 
// inside inside an IIFE (module pattern) so it cannot be used to create 
// additional instances
const UNICODE_SPACE = "\u0020";

const Gameboard = function() {
  // create 3x3 matrix to play
  const board = [];
  const rows = 3;
  const columns = 3;

  for (let i = 0; i < rows; i++) {
    const innerboard = [];
    for (let j = 0; j < columns; j++) {
      // we can display empty space when UI is added
      innerboard.push(UNICODE_SPACE);
    }
    board.push(innerboard);
  }
  
  const getBoard = () => {
    return board;
  }

  return {
    getBoard,
  };
};

const createPlayer = (sign, name) => {
  let score = 0;

  incrementScore = () => score++;
  getScore = () => score;
  getSign = () => sign;
  getName = () => name;

  return {
    getScore,
    incrementScore,
    getName,
    getSign
  }
}

const GameController = function() {
  const input1 = prompt("Player 1 [X]: ");
  const input2 = prompt("Player 2 [O]: ");

  const player1 = createPlayer("X", `[X]: ${input1}`);
  const player2 = createPlayer("O", `[O]: ${input2}`);
  let gameboard = Gameboard();
  let tieCounter = 0;

  let activePlayer = player1;
  const getActivePlayer = () => activePlayer;
  // Only allow the play by turns -> switch player
  let switchPlayer = () => {
    activePlayer = activePlayer === player1 ? player2 : player1; 
    return activePlayer;
  }

  const checkWin = (function() {
    const rows = gameboard.getBoard().length;
    const cols = gameboard.getBoard()[0].length;
    const player1Sign = "X";
    const player2Sign = "O";

    const overRows = () => {
      let player1Count = 0; 
      let player2Count = 0;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const currSign = gameboard.getBoard()[i][j];

          if (currSign === player1Sign) player1Count++;
          else if (currSign === player2Sign) player2Count++;
        }
        if (player1Count === 3 || player2Count === 3) {
          return true;
        } else {
          // reset
          player1Count = 0;
          player2Count = 0;
        }
      }
      return false;
    }

    const overColumns = () => {
      let player1Count = 0; 
      let player2Count = 0; 
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const currSign = gameboard.getBoard()[j][i];

          if (currSign === player1Sign) player1Count++;
          else if (currSign === player2Sign) player2Count++;
        }
        if (player1Count === 3 || player2Count === 3) {
          return true;
        } else {
          // reset
          player1Count = 0;
          player2Count = 0;
        }
      }
      return false;
    }

    const overDiagonals = () => {
      let principalDiagPlayer1Count = 0; 
      let principalDiagPlayer2Count = 0; 
      let diagPlayer1Count = 0; 
      let diagPlayer2Count = 0; 
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const currSign = gameboard.getBoard()[i][j];

          if (i + j == 2) {
            if (currSign == player1Sign) diagPlayer1Count++;
            else if (currSign == player2Sign) diagPlayer2Count++;
          }
          if (i == j) {
            if (currSign == player1Sign) principalDiagPlayer1Count++;
            else if (currSign == player2Sign) principalDiagPlayer2Count++;
          }
        }
      }

      if (principalDiagPlayer1Count === 3 || principalDiagPlayer2Count === 3
        || diagPlayer1Count === 3 || diagPlayer2Count === 3) {
        return true;
      }
      return false;
    }

    return {
      overRows,
      overColumns,
      overDiagonals,
    }
  })();

  // fill the 1x1 grid with whoever plays
  const playRound = (row, column) => {

    if(gameboard.getBoard()[row][column] === UNICODE_SPACE) {
      gameboard.getBoard()[row][column] = getActivePlayer().getSign();
      tieCounter++;
      if (tieCounter === 9) {
        const tieMsg = `It's a tie!`;
        const div = addResult(); 
        div.textContent = tieMsg;
        return true;
      }
      // check win or tie
      // game logic on who wins, also consider the tie situation
      if (checkWin.overColumns()
        || checkWin.overRows()
        || checkWin.overDiagonals()) {
        const winMsg = `${getActivePlayer().getName()} won the game 🎉`;
        const div = addResult();
        div.textContent = winMsg;
        // return true to disable any more clicks on the board
        return true;
      }

      switchPlayer();
    } else {
      console.log(`(row, column): ${row}, ${column} is already filled, please `
       + `choose another position`);
      alert(`(row, column): ${1 + Number(row)}, ${Number(column) + 1} is already filled, please ` 
      + `choose another position`);
    }
  }

  const addResult = () => {
    const container = document.querySelector(".container");
    const resultDiv = document.createElement("div");
    resultDiv.classList.add("result");
    container.appendChild(resultDiv);
    return resultDiv;
  }

  return {
    getActivePlayer,
    playRound,
    getBoard: gameboard.getBoard,
  }
};

const ScreenController = () => {
  const gameController = GameController();
  let playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  
  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = gameController.getBoard();

    playerTurnDiv.textContent = 
      `${gameController.getActivePlayer().getName()}'s turn`;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cellBtn = document.createElement("button");
        cellBtn.classList.add("cell-btn");

        cellBtn.dataset.row = i;
        cellBtn.dataset.column = j;
        cellBtn.textContent = board[i][j];
        boardDiv.appendChild(cellBtn);
      }
    }
  }

  boardDiv.addEventListener('click', (e) => {
    const currentRow = e.target.dataset.row;
    const currentColumn = e.target.dataset.column;

    const result = gameController.playRound(currentRow, currentColumn);
    updateScreen();
    if (result) {
      boardDiv.style.pointerEvents = "none";
    }
  });

  const container = document.querySelector(".container");
  const restartBtn = document.createElement("button");
  restartBtn.textContent = "restart game";
  restartBtn.classList.add("restart-btn");
  container.appendChild(restartBtn);

  restartBtn.addEventListener('click', () => {
    location.reload();
  });

  updateScreen();

}

ScreenController();

// Quick Play:
/*
  gameController.playRound(1, 1);
  gameController.playRound(2, 0);
  gameController.playRound(2, 2);
  gameController.playRound(0, 2);
  // final move :)
  gameController.playRound(0, 0);
*/

