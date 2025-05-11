import { TileType } from '../helper.js';

export default class GameboardUI {
  constructor(gameController) {
    this.gameController = gameController;
    this.player1Board = document.getElementById('player1-board');
    this.player2Board = document.getElementById('player2-board');
    this.statusElement = document.getElementById('game-status');
  }

  initializeUI() {
    // Create both gameboards
    this.createBoard(
      this.player1Board,
      this.gameController.player1.gameboard,
      true
    );
    this.createBoard(
      this.player2Board,
      this.gameController.player2.gameboard,
      false
    );

    // Update game status
    this.updateGameState();
  }

  createBoard(boardElement, gameboard, isPlayerBoard) {
    // Clear existing content
    boardElement.innerHTML = '';

    // Create column labels (A-J)
    const colLabels = document.createElement('div');
    colLabels.className = 'col-labels';
    for (let i = 0; i < 10; i++) {
      const label = document.createElement('div');
      label.className = 'label';
      label.textContent = String.fromCharCode(65 + i); // A-J
      colLabels.appendChild(label);
    }
    boardElement.appendChild(colLabels);

    // Create grid container
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';

    // Create row labels (1-10) and grid
    for (let row = 0; row < 10; row++) {
      const rowContainer = document.createElement('div');
      rowContainer.className = 'row-container';

      // Add row label
      const rowLabel = document.createElement('div');
      rowLabel.className = 'label';
      rowLabel.textContent = row + 1;
      rowContainer.appendChild(rowLabel);

      // Create cells for this row
      for (let col = 0; col < 10; col++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = row + 1;
        cell.dataset.col = col + 1;

        // Add ship class if there's a ship at this position
        if (isPlayerBoard && gameboard.shipGrid[row][col] === TileType.SHIP) {
          cell.classList.add('ship');
        }

        // Add hit/miss classes based on attack grid
        if (gameboard.attackGrid[row][col] === TileType.HIT) {
          cell.classList.add('hit');
        } else if (gameboard.attackGrid[row][col] === TileType.MISS) {
          cell.classList.add('miss');
        }

        // Add click handler for opponent's board
        if (!isPlayerBoard) {
          cell.addEventListener('click', () =>
            this.handleCellClick(row + 1, col + 1)
          );
        }

        rowContainer.appendChild(cell);
      }
      gridContainer.appendChild(rowContainer);
    }
    boardElement.appendChild(gridContainer);
  }

  handleCellClick(row, col) {
    // Don't allow clicks if game is over
    if (this.gameController.isGameOver()) return;

    if (this.gameController.currentPlayer !== this.gameController.player1)
      return;

    // Check if the tile has already been attacked
    const attackState =
      this.gameController.player2.gameboard.attackGrid[row - 1][col - 1];
    if (attackState !== TileType.EMPTY) return;

    const result = this.gameController.currentPlayer.attack(
      this.gameController.player2,
      row,
      col
    );
    this.updateBoard(this.player2Board, this.gameController.player2.gameboard);

    console.log(
      'After player attack - Current Player:',
      this.gameController.currentPlayer.name
    );
    console.log('Hit result:', result);

    // Only switch turns if the attack was a miss
    if (!result) {
      this.gameController.switchTurn();
      console.log(
        'After switch - Current Player:',
        this.gameController.currentPlayer.name
      );
      // Only trigger computer move if it's computer's turn
      if (this.gameController.currentPlayer === this.gameController.player2) {
        setTimeout(() => this.handleComputerMove(), 500);
      }
    }
    this.updateGameState();
  }

  handleComputerMove() {
    if (this.gameController.currentPlayer !== this.gameController.player2)
      return;

    const result = this.gameController.currentPlayer.makeComputerMove(
      this.gameController.player1
    );
    if (!result) return; // No moves available

    this.updateBoard(this.player1Board, this.gameController.player1.gameboard);

    console.log(
      'After computer attack - Current Player:',
      this.gameController.currentPlayer.name
    );
    console.log('Hit result:', result.wasHit);

    // Only switch turns if the attack was a miss
    if (!result.wasHit) {
      this.gameController.switchTurn();
      console.log(
        'After switch - Current Player:',
        this.gameController.currentPlayer.name
      );
    } else {
      // If it was a hit, computer gets another turn
      setTimeout(() => this.handleComputerMove(), 500);
    }
    this.updateGameState();
  }

  updateBoards() {
    this.updateBoard(
      this.player1Board,
      this.gameController.player1.gameboard,
      true
    );
    this.updateBoard(
      this.player2Board,
      this.gameController.player2.gameboard,
      false
    );
  }

  updateBoard(boardElement, gameboard, isPlayerBoard) {
    const cells = boardElement.querySelectorAll('.cell');
    cells.forEach((cell) => {
      const row = parseInt(cell.dataset.row) - 1;
      const col = parseInt(cell.dataset.col) - 1;

      // Remove existing state classes
      cell.classList.remove('hit', 'miss');

      // Always show ships on player's board
      if (isPlayerBoard) {
        if (gameboard.shipGrid[row][col] === TileType.SHIP) {
          cell.classList.add('ship');
        }
      }

      // Add hit/miss classes based on attack grid
      const attackState = gameboard.attackGrid[row][col];
      if (attackState === TileType.HIT) {
        cell.classList.add('hit');
      } else if (attackState === TileType.MISS) {
        cell.classList.add('miss');
      }
    });
  }

  updateGameState() {
    const currentPlayer = this.gameController.currentPlayer;
    const isGameOver = this.gameController.isGameOver();

    console.log('Current Player:', currentPlayer.name);
    console.log('Is Player1:', currentPlayer === this.gameController.player1);
    console.log('Is Computer:', currentPlayer.isComputer);

    if (isGameOver) {
      const winner = this.gameController.getWinner();
      this.statusElement.textContent = `Game Over! ${winner.name} wins!`;
    } else {
      // Check if it's player1's turn (human player)
      const isPlayer1Turn = currentPlayer === this.gameController.player1;
      this.statusElement.textContent = isPlayer1Turn
        ? 'Your turn'
        : "Computer's turn";
    }
  }

  render() {
    this.container.innerHTML = '';
    const playerBoard = this.createBoard(this.player.gameboard, true);
    const opponentBoard = this.createBoard(this.opponent.gameboard, false);
    this.container.appendChild(playerBoard);
    this.container.appendChild(opponentBoard);
    // Add click handlers for opponent's board
    opponentBoard.querySelectorAll('.cell').forEach((cell) => {
      cell.addEventListener('click', () =>
        this.handleCellClick(
          parseInt(cell.dataset.row),
          parseInt(cell.dataset.col)
        )
      );
    });
  }
}
