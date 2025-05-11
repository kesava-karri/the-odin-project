import GameController from './GameController.js';
import GameboardUI from './views/GameboardUI.js';
import { GameMode } from './helper.js';

let gameController;
let gameboardUI;

function initializeGame() {
  // Initialize the game
  gameController = new GameController(GameMode.HUMAN_VS_COMPUTER);
  gameController.initializeGame();

  // Initialize the UI
  gameboardUI = new GameboardUI(gameController);
  gameboardUI.initializeUI();

  // Show gameboards
  document.querySelector('.gameboards').style.display = 'flex';
}

// Add event listener for start game button
document.getElementById('start-game').addEventListener('click', initializeGame);
