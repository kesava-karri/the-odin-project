import Ship from '../src/Ship.js';

describe('', () => {
  let ship;
  beforeEach(() => {
    ship = new Ship(4);
  });

  describe('hit', () => {
    it('hit once', () => {
      ship.hit();
      expect(ship.getNumberOfHits()).toBe(1);
    });
  });

  describe('isSunk', () => {
    it('is not sunk', () => {
      expect(ship.isSunk()).toBe(false);
    });

    it('is sunk after being hit the length number of times', () => {
      for (let i = 0; i < ship.length - 1; i++) {
        ship.hit();
      }
      expect(ship.isSunk()).toBe(false);

      ship.hit();
      expect(ship.isSunk()).toBe(true);
    });
  });
});
