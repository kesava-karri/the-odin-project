// Purpose [Note]: From tightly coupled code to loosely coupled
// Skip to next statement by searching "[Note]"

// [Note]: Here's a simple example of tightly coupled code
function guessingGame() {
  const magicNumber =  22;
  const guess = prompt('guess a number between 1 and 100');
  if (guess > magicNumber) {
    alert('YOUR GUESS IS TOO BIG');
  } else if (guess < magicNumber) {
    alert('YOUR GUESS IS TOO SMALL');
  } else if (guess === magicNumber) {
    // condition is added for verbosity
    alert('YOU DID IT!');
  }
}

// guessingGame();

// [Note]: We can see that our `function guessingGame()` depends on 2 external functions prompt & alert which are built within the browser. Since they'd have already been tested before we just need to focus on the guessingGame() func
// [Note]: so try to make it independent of other functions

function evaluateGuess(magicNumber, guess) {
  if (guess > magicNumber) {
    return 'YOUR GUESS IS TOO BIG';
  } else if (guess < magicNumber) {
    return 'YOUR GUESS IS TOO SMALL';
  } else if (guess === magicNumber) {
    return 'YOU DID IT!';
  }
}

function guessingGameLooselyCoupled() {
  const magicNumber = 22;
  const guess = prompt('guess a number between 1 and 100');
  const message = evaluateGuess(magicNumber, guess);
  alert(message);
}

guessingGameLooselyCoupled();