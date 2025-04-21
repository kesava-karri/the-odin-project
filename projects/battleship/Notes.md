### Problems faced & Learnings

- check if the config files are with the CommonJS format having `module.exports` & change it to ES Module format since our `"type": "module"` in `package.json`

  - Simply change it to `export default config` or `export default {...}` for `jest.config.js` & `babel.config.js`

- Tried to move all the config files (including package.json) into a single directory (config/) and I think the babel-jest couldn't detect things properly & throws ` SyntaxError: Cannot use import statement outside a module`. So brought them back to root dir as I'm trying to move faster

- Had to omit `eslint config` by airbnb after introducing it into the project half way thru the project 'causing many teeny tiny issues like `no-param-reassign` where the parameter row is being post incremented

### TODOs (Written on the go)

- // TODO: don't occupy the same coordinates

  - ~The ship placement should never overlap (not even one single block of it)~
  - No ships should be placed around another ship meaning we need to leave a block space of one around every ship that's placed on the board

- // TODO: check we don't go out of bounds

#### Done

-- // TODO: Gameboard - Save the coordinates while placing the ship - 2D Array & new ship values should be enough to cross check that no overlap occurs

- Don't spend much time tyring to figure out the efficient way to store coordinates

- // TODO: Find a way to verify
- // TODO: vertical

- Q: WHy mention a col while placing a ship when we know the shipLen?
  - If we only have the row then there's many possibilities where the ship can be added based on the its length even after passing in the direction
