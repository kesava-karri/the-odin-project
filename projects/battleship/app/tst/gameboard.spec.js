import Gameboard from '../src/Gameboard';
import Ship from '../src/Ship';
import {
  create2DArray,
  fillSpecificValues,
  Direction,
  print2DArray,
  TileType,
} from '../src/helper';

describe('Gameboard', () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard();
  });
  it('init', () => {
    expect(gameboard.shipGrid).toStrictEqual(create2DArray());
  });

  describe('Ship length 4', () => {
    let ship1, ship2;
    beforeEach(() => {
      ship1 = new Ship(4);
      ship2 = new Ship(4);
    });
    it('Ship Len 4 - Horizontal', () => {
      // Arrange
      let expectedArr = fillSpecificValues(
        ship1.length,
        2,
        4,
        Direction.Horizontal
      );
      // Act
      gameboard.placeShip(ship2, 2, 4);
      // Test
      expect(gameboard.shipGrid).toStrictEqual(expectedArr);
    });

    it('Ship Len 4 - Vertical', () => {
      // Arrange
      let expectedArr = fillSpecificValues(
        ship1.length,
        6,
        4,
        Direction.Vertical
      );
      // Act
      gameboard.placeShip(ship1, 6, 4, Direction.Vertical);
      // Test
      expect(gameboard.shipGrid).toStrictEqual(expectedArr);
    });

    it('Ship Len 4 - Overlap positions', () => {
      const rowShip1 = 4;
      const colShip1 = 6;

      const rowShip2 = 3;
      const colShip2 = 8;

      // The above coordinates would overlap at (4, 8)
      const expectedCollisionRow = 4;
      gameboard.placeShip(ship1, rowShip1, colShip1);

      expect(() =>
        gameboard.placeShip(ship2, rowShip2, colShip2, Direction.Vertical)
      ).toThrow(
        new Error(
          `The tile at row: ${expectedCollisionRow} & col: ${colShip2} is already occupied`
        )
      );
    });

    it('Ship Len 4 - No placement around surroundings', () => {
      gameboard.placeShip(ship1, 5, 5);
      expect(() => {
        gameboard.placeShip(ship2, 4, 5);
      }).toThrow(new Error('Trying to place in the surroundings'));
    });

    it('marks a hit when ship is at position', () => {
      gameboard.placeShip(ship1, 2, 4);
      gameboard.receiveAttack(ship1, 2, 4);
      expect(gameboard.attackGrid[1][3]).toBe(TileType.HIT);
      expect(ship1.getNumberOfHits()).toBe(1);
    });

    it('ship is not sunk after one hit', () => {
      gameboard.placeShip(ship1, 2, 4);
      gameboard.receiveAttack(ship1, 2, 4);
      expect(ship1.isSunk()).toBe(false);
    });

    it('ship is sunk after all positions are hit', () => {
      gameboard.placeShip(ship1, 2, 4);
      gameboard.receiveAttack(ship1, 2, 4);
      gameboard.receiveAttack(ship1, 2, 5);
      gameboard.receiveAttack(ship1, 2, 6);
      gameboard.receiveAttack(ship1, 2, 7);
      expect(ship1.isSunk()).toBe(true);
    });

    it('tracks missed shots', () => {
      gameboard.placeShip(ship1, 2, 4);
      gameboard.receiveAttack(ship1, 3, 4); // Miss
      expect(gameboard.attackGrid[2][3]).toBe(TileType.MISS);
    });

    it('all ships are sunk when all ships are hit', () => {
      gameboard.placeShip(ship1, 2, 4);
      gameboard.placeShip(ship2, 6, 4, Direction.Vertical);

      // Hit all positions of ship1
      gameboard.receiveAttack(ship1, 2, 4);
      gameboard.receiveAttack(ship1, 2, 5);
      gameboard.receiveAttack(ship1, 2, 6);
      gameboard.receiveAttack(ship1, 2, 7);

      // Hit all positions of ship2
      gameboard.receiveAttack(ship2, 6, 4);
      gameboard.receiveAttack(ship2, 7, 4);
      gameboard.receiveAttack(ship2, 8, 4);
      gameboard.receiveAttack(ship2, 9, 4);

      expect(ship1.isSunk()).toBe(true);
      expect(ship2.isSunk()).toBe(true);
    });
  });
});
