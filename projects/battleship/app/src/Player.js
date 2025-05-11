import Gameboard from './Gameboard.js';
import { Direction, TileType } from './helper.js';
import Ship from './Ship.js';

export default class Player {
  constructor(name = 'Player', isComputer = false) {
    this.name = name;
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
  }

  placeShip(ship, row, col, direction = Direction.Horizontal) {
    this.gameboard.placeShip(ship, row, col, direction);
  }

  attack(opponent, row, col) {
    if (!(opponent instanceof Player)) {
      throw new Error('Can only attack another Player');
    }

    const wasHit = opponent.gameboard.receiveAttack(row, col);
    return wasHit;
  }

  // Computer player methods
  placeShipsRandomly(ships) {
    // Sort ships by length (largest first) to make placement easier
    const sortedShips = [...ships].sort((a, b) => b.length - a.length);

    for (const ship of sortedShips) {
      const validPositions = this.#calculateValidPositions(ship);

      if (validPositions.length === 0) {
        throw new Error('No valid positions available for ship placement');
      }

      // Randomly select a valid position
      const randomIndex = Math.floor(Math.random() * validPositions.length);
      const { row, col, direction } = validPositions[randomIndex];

      this.placeShip(ship, row, col, direction);
    }
  }

  #calculateValidPositions(ship) {
    const validPositions = [];
    const shipLength = ship.length;

    // Try each position and direction
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 10; col++) {
        for (const direction of [Direction.Horizontal, Direction.Vertical]) {
          if (this.#isValidPosition(shipLength, row, col, direction)) {
            validPositions.push({ row, col, direction });
          }
        }
      }
    }

    return validPositions;
  }

  #isValidPosition(shipLength, row, col, direction) {
    // Convert to zero-based indices
    let { row: r, col: c } = this.gameboard.toZeroBasedIndex(row, col);
    const dr = direction === Direction.Vertical ? 1 : 0;
    const dc = direction === Direction.Horizontal ? 1 : 0;

    // Check if ship fits within board boundaries
    if (direction === Direction.Horizontal) {
      if (c + shipLength > 10) return false;
    } else {
      if (r + shipLength > 10) return false;
    }

    // Check each position the ship would occupy
    for (let i = 0; i < shipLength; i++) {
      // Check if position is already occupied or in buffer zone
      if (this.gameboard.shipGrid[r][c] !== TileType.EMPTY) {
        return false;
      }

      // Check surrounding positions for buffer zones
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const newRow = r + dr;
          const newCol = c + dc;

          // Skip if out of bounds
          if (newRow < 0 || newRow >= 10 || newCol < 0 || newCol >= 10) {
            continue;
          }

          // If any surrounding position has a ship, this position is invalid
          if (this.gameboard.shipGrid[newRow][newCol] === TileType.SHIP) {
            return false;
          }
        }
      }

      r += dr;
      c += dc;
    }

    return true;
  }

  makeRandomAttack(opponent) {
    if (!this.isComputer) return;

    let attacked = false;
    const maxAttempts = 100; // Prevent infinite loops
    let attempts = 0;

    while (!attacked && attempts < maxAttempts) {
      const row = Math.floor(Math.random() * 10) + 1;
      const col = Math.floor(Math.random() * 10) + 1;
      const r = row - 1;
      const c = col - 1;

      // Only attack if this position hasn't been attacked before
      if (opponent.gameboard.attackGrid[r][c] === TileType.EMPTY) {
        this.attack(opponent, row, col);
        attacked = true;
      }
      attempts++;
    }

    if (!attacked) {
      throw new Error('No valid attack positions available');
    }
  }

  allShipsSunk() {
    return this.gameboard.ships.length > 0 && this.gameboard.allShipsSunk();
  }

  makeComputerMove(opponent) {
    // Get all possible moves (coordinates that haven't been attacked)
    const possibleMoves = [];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (opponent.gameboard.attackGrid[row][col] === TileType.EMPTY) {
          possibleMoves.push({ row, col });
        }
      }
    }

    // If no moves are available, return null
    if (possibleMoves.length === 0) {
      return null;
    }

    // Select a random move from possible moves
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    const move = possibleMoves[randomIndex];

    // Make the attack and return both the move and hit result
    const wasHit = this.attack(opponent, move.row + 1, move.col + 1);
    return { move, wasHit };
  }
}
