/**
 * Re-writing the requirements after simplifying:
 * Only rely on tests; no relying on console.log or DOM methods
 * Gameboards should place ships at specific coordinates by calling Ship
 * `receiveAttack` function that takes a pair or cooradinates & check if the battleship exists there & send hit if present if not record those missed attack coordinates
 * Should report if all the ships have been sunk
 */

import { create2DArray, fillInBuffer, Direction, TileType } from './helper';

export default class Gameborad {
  constructor() {
    this.shipGrid = create2DArray(TileType.EMPTY);
    this.attackGrid = create2DArray(TileType.EMPTY);

    this.ships = [];
  }

  // Note: `direction` is defaulted to horizontal, so we don't have to pass in the direction everytime when this method is called
  placeShip(ship, row, col, direction = Direction.Horizontal) {
    const shipLen = ship.length;
    this.ships.push(ship);

    if (!Object.values(Direction).includes(direction)) {
      throw new Error(
        'Invalid direction, use Direction.Horizontal or Direction.Vertical'
      );
    }
    // the row & col start from 1
    let inputRow = row - 1;
    let inputCol = col - 1;

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

    let counter = 0;
    const dr = direction === Direction.Vertical ? 1 : 0;
    const dc = direction === Direction.Horizontal ? 1 : 0;

    while (counter++ < shipLen) {
      // TileType.SHIP indicates that the grid is occupied by part of the ship
      this.shipGrid[inputRow][inputCol] = TileType.SHIP;
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
      if (this.shipGrid[row][col] === TileType.SHIP) {
        return { row, col, flag: true };
      }
      row += dr;
      col += dc;
    }
    return { flag };
  }

  receiveAttack(ship, row, col) {
    const r = row - 1;
    const c = col - 1;
    if (this.shipGrid[r][c] === TileType.SHIP) {
      this.attackGrid[r][c] = TileType.HIT;
      ship.hit();
    } else {
      this.attackGrid[r][c] = TileType.MISS;
    }
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
