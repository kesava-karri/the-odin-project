### Issues/Problems faced

- We need jest as well, tho we install babel-jest to use ES6 imports

- ReferenceError: module is not defined in jest.config.js:198:8
  - jest.config.js wasn't initialized w a module but used module.exports

  - The issue is when we mention the "type: module" in the package.json the node environment treats `.js` files as ES Modules (ESM) by default, instead of traditional CommonJS(cjs) format.

  - So changed the file extension to .cjs

- The file named "main-spec.js" wasn't detected as a test even after enabling the regex in the jest.config.js file, especially the "hyphen (-)", so renamed the file to "main.spec.js" instead


### Notes
- When `npm test` literally means `npm run jest` (assuming "test": "jest" is defined in package.json) why does the latter throw error?
 - When we run `npm run jest` it literally checks for a script named _jest_ in the package.json & not the __Jest__ pacakge
 - So if you'd still like to make it work, have a new property `"jest" : "jest"` & it would help you run the command `npm run jest` :)
- When we split a function into multiple chunks of helper functions, we do not need to write the test for each & every function we write. We just need to write it for the public ones