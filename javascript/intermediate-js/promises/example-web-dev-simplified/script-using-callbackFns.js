// Web Dev Simplified

const userLeft = false;
const userWatchingCatMeme = true;

function watchTutorialCallback(callback, errorCallback) {
  if (userLeft) {
    errorCallback({ name: "User Left", message: ":(" });
  } else if (userWatchingCatMeme) {
    errorCallback({
      name: "User watching cat meme ",
      message: "WebDevSimplified < Cat",
    });
  } else {
    callback("Thumbs up and subscribe");
  }
}

watchTutorialCallback(
  (message) => console.log("Success: " + message),
  (error) => console.log(error.name + "\n" + error.message)
);
