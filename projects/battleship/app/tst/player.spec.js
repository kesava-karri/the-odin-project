import Player from '../src/Player';
import Gameboard from '../src/Gameboard';
import Ship from '../src/Ship';
import { TileType } from '../src/helper';

describe('Player', () => {
  let player;

  beforeEach(() => {
    player = new Player();
  });

  it('creates a player with a gameboard', () => {
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  it('can create a real player', () => {
    const realPlayer = new Player(true);
    expect(realPlayer.isComputer).toBe(false);
  });

  it('can create a computer player', () => {
    const computerPlayer = new Player(false);
    expect(computerPlayer.isComputer).toBe(true);
  });

  describe('Player Actions', () => {
    it('can attack another player', () => {
      const opponent = new Player();
      const ship = new Ship(4);
      opponent.placeShip(ship, 2, 4);

      player.attack(opponent, 2, 4);

      // Verify the attack affected opponent's gameboard
      expect(opponent.gameboard.attackGrid[1][3]).toBe(TileType.HIT);
    });

    it('can check if all their ships are sunk', () => {
      expect(player.allShipsSunk()).toBe(false);
      // The actual sinking logic is handled by Gameboard
    });
  });
});
