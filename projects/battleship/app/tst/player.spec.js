import Player from '../src/Player';
import Gameboard from '../src/Gameboard';
import Ship from '../src/Ship';
import { TileType, GameMode } from '../src/helper';

describe('Player', () => {
  let player;
  let opponent;

  beforeEach(() => {
    player = new Player('Player 1');
    opponent = new Player('Player 2');
  });

  it('creates a player with a gameboard', () => {
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  it('can create a human player with default name', () => {
    const humanPlayer = new Player();
    expect(humanPlayer.name).toBe('Player');
    expect(humanPlayer.isComputer).toBe(false);
  });

  it('can create a human player with custom name', () => {
    const humanPlayer = new Player('John');
    expect(humanPlayer.name).toBe('John');
    expect(humanPlayer.isComputer).toBe(false);
  });

  it('can create a computer player', () => {
    const computerPlayer = new Player('Computer', true);
    expect(computerPlayer.name).toBe('Computer');
    expect(computerPlayer.isComputer).toBe(true);
  });

  describe('Player Actions', () => {
    it('can attack another player', () => {
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

  describe('computer player behavior', () => {
    let computerPlayer;

    beforeEach(() => {
      computerPlayer = new Player('Computer', true);
    });

    it('creates a computer player', () => {
      expect(computerPlayer.name).toBe('Computer');
      expect(computerPlayer.isComputer).toBe(true);
    });

    it('makes random legal moves', () => {
      const computer = new Player('Computer', true);
      const opponent = new Player('Human');
      const result = computer.makeComputerMove(opponent);

      // Verify move was legal
      expect(result).toBeDefined();
      expect(result.move.row).toBeGreaterThanOrEqual(0);
      expect(result.move.row).toBeLessThan(10);
      expect(result.move.col).toBeGreaterThanOrEqual(0);
      expect(result.move.col).toBeLessThan(10);
      expect(result.wasHit).toBeDefined();
    });

    it('does not attack already hit coordinates', () => {
      const computer = new Player('Computer', true);
      const opponent = new Player('Human');
      const firstMove = computer.makeComputerMove(opponent);
      const secondMove = computer.makeComputerMove(opponent);

      expect(
        secondMove.move.row === firstMove.move.row &&
          secondMove.move.col === firstMove.move.col
      ).toBe(false);
    });

    it('returns null when no legal moves are available', () => {
      const computer = new Player('Computer', true);
      const opponent = new Player('Human');

      // Fill the board with attacks
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          opponent.gameboard.receiveAttack(row + 1, col + 1);
        }
      }

      const result = computer.makeComputerMove(opponent);
      expect(result).toBeNull();
    });
  });
});
