// tip: if you need only single instance of something then wrap the factory 
// inside inside an IIFE (module pattern) so it cannot be used to create 
// additional instances
const UNICODE_SPACE = "\u0020";

const Gameboard = (function() {
  // create 3x3 matrix to play
  const board = [];
  const rows = 3;
  const columns = 3;

  const createBoard = () => {
    for (let i = 0; i < rows; i++) {
      const innerboard = [];
      for (let j = 0; j < columns; j++) {
        // we can display empty space when UI is added
        innerboard.push(UNICODE_SPACE);
      }
      board.push(innerboard);
    }
    return getBoard();
  }
  
  const getBoard = () => {
    return board;
  }

  return {
    createBoard,
    getBoard,
  };
})();

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
  const player1 = createPlayer("X", "Player 1: [X]");
  const player2 = createPlayer("O", "Player 2: [O]");
  let gameboard = Gameboard.createBoard();

  let activePlayer = player1;
  
  // Only allow the play by turns -> switch player
  let switchPlayer = () => {
    activePlayer = activePlayer === player1 ? player2 : player1; 
    return activePlayer;
  }

  const checkWin = (function() {
    const rows = gameboard.length;
    const cols = gameboard[0].length;
    const player1Sign = "X";
    const player2Sign = "O";

    const overRows = () => {
      let player1Count = 0; 
      let player2Count = 0; 
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const currSign = gameboard[i][j];
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
      return "";
    }

    const overColumns = () => {
      let player1Count = 0; 
      let player2Count = 0; 
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const currSign = gameboard[j][i];
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
      return "";
    }

    const overDiagonals = () => {
      let principalDiagPlayer1Count = 0; 
      let principalDiagPlayer2Count = 0; 
      let diagPlayer1Count = 0; 
      let diagPlayer2Count = 0; 
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (i + j == 2) {
            if (gameboard[i][j] == player1Sign) diagPlayer1Count++;
            else if (gameboard[i][j] == player2Sign) diagPlayer2Count++;
          }
          if (i == j) {
            if (gameboard[i][j] == player1Sign) principalDiagPlayer1Count++;
            else if (gameboard[i][j] == player2Sign) principalDiagPlayer2Count++;
          }
        }
      }

      if (principalDiagPlayer1Count === 3 || principalDiagPlayer2Count === 3
        || diagPlayer1Count === 3 || diagPlayer2Count === 3) {
        return true;
      }
    }

    return {
      overRows,
      overColumns,
      overDiagonals,
    }
  })();

  // fill the 1x1 grid with whoever plays
  const playRound = (row, column) => {
    console.log(`${activePlayer.getName()} is making the move at (row, column): `
      + `(${row}, ${column})`
    );

    const printBoard = () => {
      for (let i = 0; i < 3; i++) {
        console.log(gameboard[i]);
      }
      return "Here's the board after the play";
    }

    if(gameboard[row][column] === UNICODE_SPACE) {
      gameboard[row][column] = activePlayer.getSign();
      // check win or tie
      // game logic on who wins, also consider the tie situation
      if (checkWin.overColumns()
        || checkWin.overRows()
        || checkWin.overDiagonals()) {
        printBoard();
        console.log(`${activePlayer.getName()} won the game`);
        return `${activePlayer.getName()} won the game`;
      }

      switchPlayer();
    } else {
      console.log(`(row, column): ${row} ${column} is already filled, please 
      choose another position`);
    }

    return printBoard();
  }

  return {
    activePlayer,
    playRound,
  }
  

  // display the result in a box -> UI

  // Display Scoreboard -> UI
};

const gameController = GameController();

// Quick Play:
/*
  gameController.playRound(1, 1);
  gameController.playRound(2, 0);
  gameController.playRound(2, 2);
  gameController.playRound(0, 2);
  // final move :)
  gameController.playRound(0, 0);
*/

