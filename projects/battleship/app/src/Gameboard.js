/**
 * Re-writing the requirements after simplifying:
 * Only rely on tests; no relying on console.log or DOM methods
 * Gameboards should place ships at specific coordinates by calling Ship
 * `receiveAttack` function that takes a pair or cooradinates & check if the battleship exists there & send hit if present if not record those missed attack coordinates
 * Should report if all the ships have been sunk
 */

import { create2DArray, fillInBuffer, Direction, TileType } from './helper.js';

export default class Gameboard {
  constructor() {
    this.shipGrid = create2DArray(TileType.EMPTY);
    this.attackGrid = create2DArray(TileType.EMPTY);

    this.ships = [];
    // {key: "row,col", value: ship}
    this.shipPositions = new Map();
  }

  toZeroBasedIndex(row, col) {
    return { row: row - 1, col: col - 1 };
  }

  placeShip(ship, row, col, direction = Direction.Horizontal) {
    const shipLen = ship.length;
    this.ships.push(ship);

    if (!Object.values(Direction).includes(direction)) {
      throw new Error(
        'Invalid direction, use Direction.Horizontal or Direction.Vertical'
      );
    }

    let { row: inputRow, col: inputCol } = this.toZeroBasedIndex(row, col);

    const overlapCheck = this.#checkIfOverlaps(
      shipLen,
      inputRow,
      inputCol,
      direction
    );
    if (overlapCheck.flag) {
      throw new Error(
        `The tile at row: ${overlapCheck.row + 1} & col: ${
          overlapCheck.col + 1
        } is already occupied`
      );
    }

    const bufferCheck = this.#checkBufferZone(
      shipLen,
      inputRow,
      inputCol,
      direction
    );
    if (bufferCheck) {
      throw new Error('Trying to place in the surroundings');
    }

    // Place the ship on the grid and set its position
    let counter = 0;
    const dr = direction === Direction.Vertical ? 1 : 0;
    const dc = direction === Direction.Horizontal ? 1 : 0;

    while (counter++ < shipLen) {
      // TileType.SHIP indicates that the grid is occupied by part of the ship
      this.shipGrid[inputRow][inputCol] = TileType.SHIP;
      this.shipPositions.set(`${inputRow},${inputCol}`, ship);
      inputRow += dr;
      inputCol += dc;
    }
    fillInBuffer(this.shipGrid, shipLen, row - 1, col - 1, direction);
  }

  #checkBufferZone(shipLen, inputRow, inputCol, direction) {
    let counter = 0;
    // delta row; delta col
    const dr = direction === Direction.Vertical ? 1 : 0;
    const dc = direction === Direction.Horizontal ? 1 : 0;

    while (counter++ < shipLen) {
      if (this.shipGrid[inputRow][inputCol] === TileType.BUFFER) {
        return true;
      }
      inputRow += dr;
      inputCol += dc;
    }
  }

  #checkIfOverlaps(shipLen, row, col, direction) {
    let counter = 0;
    const dr = direction === Direction.Vertical ? 1 : 0;
    const dc = direction === Direction.Horizontal ? 1 : 0;
    const flag = false;

    while (counter++ < shipLen) {
      // Check if row and col are within bounds
      if (row < 0 || row >= 10 || col < 0 || col >= 10) {
        return { row, col, flag: true };
      }

      if (this.shipGrid[row][col] === TileType.SHIP) {
        return { row, col, flag: true };
      }
      row += dr;
      col += dc;
    }
    return { flag };
  }

  receiveAttack(row, col) {
    const r = row - 1;
    const c = col - 1;

    // If position has already been attacked, return false (miss)
    if (this.attackGrid[r][c] !== TileType.EMPTY) {
      return false;
    }

    const wasHit = this.shipGrid[r][c] === TileType.SHIP;
    if (wasHit) {
      this.attackGrid[r][c] = TileType.HIT;
      const ship = this.shipPositions.get(`${r},${c}`);
      if (ship) ship.hit();
    } else {
      this.attackGrid[r][c] = TileType.MISS;
    }

    return wasHit;
  }

  toString() {
    const rows = this.shipGrid;
    process.stdout.write('--- Gameboard ---\n');
    for (const row of rows) {
      process.stdout.write(`${row}\n`);
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
