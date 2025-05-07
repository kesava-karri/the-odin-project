import Gameboard from './Gameboard';
import { Direction, TileType } from './helper';

export default class Player {
  constructor(isReal = true) {
    this.gameboard = new Gameboard();
    this.isComputer = !isReal;
  }

  placeShip(ship, row, col, direction = Direction.Horizontal) {
    this.gameboard.placeShip(ship, row, col, direction);
  }

  attack(opponent, row, col) {
    if (!(opponent instanceof Player)) {
      throw new Error('Can only attack another Player');
    }

    opponent.gameboard.receiveAttack(row, col);
  }

  // Computer player methods
  placeShipsRandomly(ships) {
    if (!this.isComputer) return;

    const maxAttempts = 100; // Prevent infinite loops
    let attempts = 0;

    for (const ship of ships) {
      let placed = false;
      while (!placed && attempts < maxAttempts) {
        try {
          const row = Math.floor(Math.random() * 10) + 1;
          const col = Math.floor(Math.random() * 10) + 1;
          const direction =
            Math.random() < 0.5 ? Direction.Horizontal : Direction.Vertical;
          this.placeShip(ship, row, col, direction);
          placed = true;
        } catch (error) {
          attempts++;
          if (attempts >= maxAttempts) {
            throw new Error(
              `Failed to place ship after ${maxAttempts} attempts. The board might be too crowded.`
            );
          }
        }
      }
    }
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
}
