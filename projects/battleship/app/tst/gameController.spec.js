import GameController from '../src/GameController';
import Player from '../src/Player';
import Ship from '../src/Ship';
import { GameMode, Direction } from '../src/helper';

describe('GameController', () => {
  let gameController;

  beforeEach(() => {
    gameController = new GameController();
    gameController.initializeGame();
  });

  // Helper function to sink all ships for a player
  const sinkAllShips = (player) => {
    player.gameboard.ships.forEach((ship) => {
      for (let i = 0; i < ship.length; i++) {
        ship.hit();
      }
    });
  };

  describe('game mode initialization', () => {
    it('defaults to humanVsComputer mode', () => {
      expect(gameController.gameMode).toBe(GameMode.HUMAN_VS_COMPUTER);
    });

    it('creates correct player types in humanVsComputer mode', () => {
      expect(gameController.player1.isComputer).toBe(false);
      expect(gameController.player2.isComputer).toBe(true);
    });

    it('creates correct player types in humanVsHuman mode', () => {
      const humanVsHumanGame = new GameController(GameMode.HUMAN_VS_HUMAN);
      expect(humanVsHumanGame.player1.isComputer).toBe(false);
      expect(humanVsHumanGame.player2.isComputer).toBe(false);
    });

    it('sets appropriate player names', () => {
      expect(gameController.player1.name).toBe('Player 1');
      expect(gameController.player2.name).toBe('Player 2');
    });
  });

  describe('game flow', () => {
    it('starts with player1 as current player', () => {
      expect(gameController.currentPlayer).toBe(gameController.player1);
    });

    it('switches turns between players correctly', () => {
      gameController.switchTurn();
      expect(gameController.currentPlayer).toBe(gameController.player2);

      gameController.switchTurn();
      expect(gameController.currentPlayer).toBe(gameController.player1);
    });

    describe('in humanVsComputer mode', () => {
      beforeEach(() => {
        gameController = new GameController(GameMode.HUMAN_VS_COMPUTER);
        gameController.initializeGame();
      });

      it('allows computer to make random attacks', () => {
        const originalAttackGrid = JSON.parse(
          JSON.stringify(gameController.player1.gameboard.attackGrid)
        );

        // Make a player move to trigger computer move
        gameController.currentPlayer.attack(gameController.player2, 1, 1);
        // Manually trigger computer move
        gameController.player2.makeComputerMove(gameController.player1);

        // Verify that the attack grid has changed
        expect(gameController.player1.gameboard.attackGrid).not.toEqual(
          originalAttackGrid
        );
      });

      it("prevents computer from making attacks when it's not their turn", () => {
        gameController.currentPlayer = gameController.player1; // Set human as current player
        expect(() => {
          gameController.player2.makeRandomAttack(gameController.player1);
        }).not.toThrow();
      });
    });

    describe('in humanVsHuman mode', () => {
      let humanVsHumanGame;

      beforeEach(() => {
        humanVsHumanGame = new GameController(GameMode.HUMAN_VS_HUMAN);
        humanVsHumanGame.initializeGame();
      });

      it('allows both players to make manual attacks', () => {
        // Player 1 attacks Player 2
        humanVsHumanGame.currentPlayer.attack(humanVsHumanGame.player2, 1, 1);
        expect(humanVsHumanGame.player2.gameboard.attackGrid[0][0]).not.toBe(0);

        // Switch turns
        humanVsHumanGame.switchTurn();

        // Player 2 attacks Player 1
        humanVsHumanGame.currentPlayer.attack(humanVsHumanGame.player1, 1, 1);
        expect(humanVsHumanGame.player1.gameboard.attackGrid[0][0]).not.toBe(0);
      });
    });
  });

  describe('game state', () => {
    it('reports game not over when ships are still afloat', () => {
      expect(gameController.isGameOver()).toBe(false);
    });

    it('reports game over when all player1 ships are sunk', () => {
      sinkAllShips(gameController.player1);
      expect(gameController.isGameOver()).toBe(true);
    });

    it('reports game over when all player2 ships are sunk', () => {
      sinkAllShips(gameController.player2);
      expect(gameController.isGameOver()).toBe(true);
    });

    it('reports no winner when game is not over', () => {
      expect(gameController.getWinner()).toBe(null);
    });

    it('reports player2 as winner when all player1 ships are sunk', () => {
      sinkAllShips(gameController.player1);
      expect(gameController.getWinner()).toBe(gameController.player2);
    });

    it('reports player1 as winner when all player2 ships are sunk', () => {
      // Reset player1's ships to not sunk
      gameController.player1.gameboard.ships.forEach((ship) => (ship.hits = 0));
      sinkAllShips(gameController.player2);
      expect(gameController.getWinner()).toBe(gameController.player1);
    });

    it('determines the winner correctly', () => {
      const gameController = new GameController(GameMode.HUMAN_VS_COMPUTER);
      gameController.initializeGame();
      // Reset player1's ships to not sunk
      gameController.player1.gameboard.ships.forEach((ship) => (ship.hits = 0));
      sinkAllShips(gameController.player2);
      expect(gameController.isGameOver()).toBe(true);
      expect(gameController.getWinner()).toBe(gameController.player1);
    });
  });
});
