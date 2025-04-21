import Gameboard from '../src/Gameboard';
import Ship from '../src/Ship';
import {
  create2DArray,
  fillSpecificValues,
  Direction,
  print2DArray,
} from '../src/helper';

describe('Gameboard', () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard();
  });
  it('init', () => {
    expect(gameboard.board).toStrictEqual(create2DArray());
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
      gameboard.placeShip(ship1.length, 2, 4);
      // Test
      // print2DArray(expectedArr);
      // gameboard.toString();
      expect(gameboard.board).toStrictEqual(expectedArr);
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
      gameboard.placeShip(ship1.length, 6, 4, Direction.Vertical);
      // Test
      expect(gameboard.board).toStrictEqual(expectedArr);
    });

    it('Ship Len 4 - Overlap positions', () => {
      const rowShip1 = 4;
      const colShip1 = 6;

      const rowShip2 = 3;
      const colShip2 = 8;

      // The above coordinates would overlap at (4, 8)
      const expectedCollisionRow = 4;
      gameboard.placeShip(ship1.length, rowShip1, colShip1);

      expect(() =>
        gameboard.placeShip(
          ship2.length,
          rowShip2,
          colShip2,
          Direction.Vertical
        )
      ).toThrow(
        new Error(
          `The tile at row: ${expectedCollisionRow} & col: ${colShip2} is already occupied`
        )
      );
    });

    it('Ship Len 4 - No placement around surroundings', () => {
      gameboard.placeShip(ship1.length, 5, 5);
      expect(() => {
        gameboard.placeShip(ship2.length, 4, 5);
      }).toThrow(new Error('Trying to place in the surroundings'));
    });
  });

  /*
    it('add a ship of length 3 to the gameboard', () => {});
    it('add a ship of length 2 to the gameboard', () => {});
    it('add a ship of length 1 to the gameboard', () => {});
  */
});
