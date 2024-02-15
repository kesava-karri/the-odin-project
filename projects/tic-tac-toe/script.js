// tip: if you need only single instance of something then wrap the factory 
// inside inside an IIFE (module pattern) so it cannot be used to create 
// additional instances

const Gameboard = (function() {
  // create 3x3 matrix to play
  const board = [];

  const createBoard = () => {
    for (let i = 0; i < 3; i++) {
      const innerboard = [];
      for (let j = 0; j < 3; j++) {
        // we can display empty space when UI is added
        innerboard.push("-");
      }
      board.push(innerboard);
    }
  }
  
  const getBoard = () => {
    return board;
  }

  const printBoard = () => {
    board.map((row) => console.log(row));
    return "printed board";
  }
  return {
    createBoard,
    getBoard,
    printBoard,
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

const GameController = (function() {
  const player1 = createPlayer("X", "Player 1(X)");
  const player2 = createPlayer("O", "Player 2(O)");
  let gameboard = Gameboard;
  gameboard.createBoard();

  let activePlayer = player1;
  
  // Only allow the play by turns -> switch player
  let switchPlayer = () => {
    activePlayer = activePlayer === player1 ? player2 : player1; 
    return activePlayer;
  }

  // fill the 1x1 grid with whoever plays
  const playRound = (row, column) => {
    console.log(`${activePlayer.getName()} is making the move at (row, column): (${row}, ${column})`);
    if(gameboard.getBoard()[row][column] === "-") {
      gameboard.getBoard()[row][column] = activePlayer.getSign();
      // check win or tie
      // game logic on who wins, also consider the tie situation
      // gameboard.

      switchPlayer();
    } else {
      console.log(`(row, column): ${row} ${column} is already filled, please 
      choose another position`);
    }
    gameboard.printBoard();
  }

  return {
    activePlayer,
    playRound,
  }
  

  // display the result in a box -> UI

  // Display Scoreboard -> UI
});

const gameController = GameController();

