// Look after the API Key - It's public API so ig it should be fine :) for now!
// Will get it from .env later!
const API_KEY = "AR4YMRS33G6DS3PS2U8YPYQF2";
const API =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

async function getWeatherInfoAPI(location) {
  const endpoint = `${API}/${location}?key=${API_KEY}`;
  const data = await fetch(endpoint, {
    mode: "cors",
  });
  const json = await data.json();
  return json;
}

const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const inputLocation = document.querySelector("#location");
  const userQueryLocation = inputLocation.value.trim() || "Seattle";
  inputLocation.placeHolder = userQueryLocation;
  const json = await getWeatherInfoAPI(userQueryLocation);
  let extractedData = extractRequiredWeatherInfo(json);

  document.querySelector(".address").textContent =
    extractedData["resolvedAddress"];
  document.querySelector(".description").textContent =
    extractedData["description"];
  document.querySelector(".current-temp").textContent =
    extractedData.days[0].temp;

  let days0 = grabDeets(extractedData.days[0]);
  let currentForecast = document.querySelectorAll(".current");
  currentForecast.forEach((item, index) => {
    item.textContent = days0[index];
  });
  let weekContainer = document.querySelector(".week-forecast-container");
  let innerContainer = document.querySelector(".inner-container");
  // Only for the next 6 days
  for (let i = 0; i < 7; i++) {
    innerContainer.appendChild(briefWeather(grabDeets(extractedData.days[i])));
  }
  weekContainer.appendChild(innerContainer);
});

function briefWeather(input) {
  const div = document.createElement("div");
  div.classList.add("forecast");
  for (const ele of input) {
    const p = document.createElement("p");
    p.textContent = ele;
    div.appendChild(p);
  }
  return div;
}

function grabDeets(inputObj) {
  return [
    inputObj.datetime,
    inputObj.tempmin,
    inputObj.tempmax,
    inputObj.precipprob,
    inputObj.sunrise,
    inputObj.sunset,
  ];
}

// Extract the data we're looking for!
function extractRequiredWeatherInfo(json) {
  const fields = [
    "resolvedAddress",
    "description",
    "currentConditions.temp",
    "currentConditions.sunrise",
    "currentConditions.sunset",
    "days",
  ];

  const extractedData = fields.reduce((obj, field) => {
    const arr = field.split(".");
    arr.reduce((json, splitStr) => {
      const value = json[splitStr];
      if (value != undefined) {
        obj[field] = value;
      } else {
        const objField = obj[field];
        if (objField) {
          obj[field] = objField[splitStr];
        }
      }
      return obj;
    }, json);

    return obj;
  }, {});

  return extractedData;
}
