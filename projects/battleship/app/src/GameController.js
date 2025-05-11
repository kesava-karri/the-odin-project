import Player from './Player.js';
import Ship from './Ship.js';
import { Direction, GameMode } from './helper.js';

export default class GameController {
  constructor(gameMode = GameMode.HUMAN_VS_COMPUTER) {
    this.gameMode = gameMode;
    this.player1 = new Player('Player 1', false); // Always human
    this.player2 = new Player(
      'Player 2',
      gameMode === GameMode.HUMAN_VS_COMPUTER
    );
    this.currentPlayer = this.player1;
  }

  // Initialize the game with ships
  initializeGame() {
    // Create ships for both players (unique instances for each)
    const ships1 = [
      new Ship(4), // Battleship
      new Ship(3), // Cruiser
      new Ship(2), // Destroyer
      new Ship(1), // Submarine
    ];
    const ships2 = [
      new Ship(4), // Battleship
      new Ship(3), // Cruiser
      new Ship(2), // Destroyer
      new Ship(1), // Submarine
    ];

    // Place ships randomly for both players
    this.player1.placeShipsRandomly([...ships1]);
    this.player2.placeShipsRandomly([...ships2]);
  }

  // Switch turns between players
  switchTurn() {
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  // Check if game is over
  isGameOver() {
    return this.player1.allShipsSunk() || this.player2.allShipsSunk();
  }

  // Get the winner
  getWinner() {
    if (this.player1.allShipsSunk()) return this.player2;
    if (this.player2.allShipsSunk()) return this.player1;
    return null;
  }
}
