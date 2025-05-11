# Battleship Game

A classic implementation of the Battleship game built with JavaScript, following Test-Driven Development (TDD) principles.

## Live Demo

[Play the game here](https://kesava-karri.github.io/the-odin-project/projects/battleship/)

## Features

- Classic 10x10 Battleship gameplay
- Ships of varying sizes:
  - Carrier (5)
  - Battleship (4)
  - Cruiser (3)
  - Submarine (3)
  - Destroyer (2)
- Player vs Computer mode
- Visual game board with hit/miss indicators
- Persistent ship display on player's board
- Turn-based gameplay with hit continuation
- Game state management and win detection

## Technical Implementation

### Architecture

- Built using Test-Driven Development (TDD)
- Decoupled business logic from UI components
- Modular code structure with separate classes for:
  - Gameboard
  - Player
  - Ship
  - GameController
  - GameboardUI

### Key Features

- Object-oriented design
- Pure business logic separated from DOM manipulation
- Comprehensive test suite using Jest
- Responsive and intuitive user interface

## Game Rules

1. Each player has a 10x10 grid
2. Ships are placed randomly at the start of the game
3. Players take turns attacking coordinates
4. Hit a ship? Get another turn!
5. Miss? Turn switches to the opponent
6. First player to sink all opponent's ships wins

## Setup and Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd projects/battleship
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   python3 -m http.server 8000
   ```
5. Open your browser and visit:
   ```
   http://localhost:8000
   ```

## Running Tests

To run the test suite:

```bash
npm test
```

## Project Structure

```
battleship/
├── app/
│   ├── src/
│   │   ├── Gameboard.js
│   │   ├── Player.js
│   │   ├── Ship.js
│   │   ├── GameController.js
│   │   ├── helper.js
│   │   ├── main.js
│   │   ├── styles/
│   │   │   └── main.css
│   │   └── views/
│   │       └── GameboardUI.js
│   └── tst/
│       └── gameController.spec.js
├── index.html
├── package.json
└── README.md
```

## Skills Demonstrated

- Test-Driven Development (TDD)
- Object-Oriented Programming
- DOM Manipulation
- Event Handling
- Game State Management
- UI/UX Design
- Code Organization and Modularity

## Future Improvements

- Add multiplayer support
- Implement custom ship placement
- Add difficulty levels for computer opponent
- Include sound effects and animations
- Add game statistics and history

## License

This project is part of The Odin Project curriculum and is open source.

### Details

- Battle ships would be of the sizes 4, 3, 2, 1
- Board is numbered from 1 to 10 on both sides; Maybe alphabets over cols
