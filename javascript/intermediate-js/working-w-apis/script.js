import env from "./env.js";

const API_KEY = env.GIPHY_API_KEY;
const defaultGifURL =
  "https://media1.tenor.com/m/7Pdmk-GDskIAAAAd/piplup-pokemon.gif";
let search_input = document.querySelector("input");
let search_string = "";

const container = document.querySelector(".container");
let img = document.querySelector(".random-img");
const defaultGif = document.querySelector(".default-gif");
// Default gif
img.setAttribute("src", defaultGifURL);

async function getGif() {
  // Giphy API
  const giphyTranslateEndpoint = `https://api.giphy.com/v1/gifs/translate?s=${search_string}&api_key=${API_KEY}`;

  await fetch(giphyTranslateEndpoint, {
    mode: "cors",
  })
    .then((result) => {
      // for errors when the promise is not rejected but responds w error status 4xx
      if (!result.ok) {
        throw new Error(result.status);
      }
      let json = result.json();
      return json;
    })
    .then((res) => {
      if (res.data.length === 0) {
        const error_msg = document.querySelector(".error-message");
        error_msg.classList.remove("hide");
        img.classList.add("hide");
        defaultGif.classList.add("hide");
      } else {
        img.setAttribute("src", `${res.data.images.original.url}`);
        defaultGif.classList.add("hide");
      }
    })
    .catch((error) => {
      const statusCode = Number(error.message);

      if (statusCode === 401) {
        console.error(
          `Response status - ${error} +
            \nErrorMessage: Unauthorized request - Incorrect API KEY`
        );
        alert(`ErrorMessage: Unauthorized request: Incorrect API_KEY`);
      } else if ((statusCode = 429)) {
        console.error(
          `Response stats - ${error} + 
            \nErrorMessage: Rate limit exceeded - Too many requests`
        );
        alert(`ErrorMessage: Rate limit exceeded - Too many requests`);
      } else {
        console.error(`Response stats - ${error}`);
      }
    });
}

const btn = document.createElement("button");
btn.classList.add("btn");
btn.textContent = "Click Me!";
btn.addEventListener("click", () => {
  search_string = search_input.value;
  if (search_string.trim() === "") {
    alert("Yo the input field's MIA\ndrop the GIF you're tryna find, fam!");
    return;
  }
  console.log(search_string);
  getGif();
});

const searchContainer = document.querySelector(".search-container");

container.appendChild(img);
searchContainer.appendChild(btn);
document.body.appendChild(container);
