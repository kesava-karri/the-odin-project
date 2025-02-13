let req = new XMLHttpRequest();
const url =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
req.open("put", url, true);
req.send("london?key=API_KEY");
