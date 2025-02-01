// Re-writing it using promises
const userLeft = false;
const userWatchingCatMeme = true;

const watchTutorialPromise = new Promise(executor);
// const watchTutorialPromise = () => new Promise(executor);

function executor(resolveFunc, rejectFunc) {
  if (userLeft) {
    rejectFunc({ name: "User Left", message: ":(" });
  } else if (userWatchingCatMeme) {
    rejectFunc({
      name: "User watching cat meme",
      message: "Web Dev Simplified < Cat Meme",
    });
  } else {
    resolveFunc("Thumbs up and subscribe");
  }
}

const resolveFunc = (message) => console.log("Success: " + message);

function rejectFunc(error) {
  console.log(error.name + "\n" + error.message);
}

watchTutorialPromise.then(resolveFunc).catch(rejectFunc);
// watchTutorialPromise().then(resolveFunc).catch(rejectFunc);
