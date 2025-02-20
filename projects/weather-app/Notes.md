--- Issues:
- [ x ] Clear the old values when a new location is entered :)

--- Things that can be added in future
- Error handling
  - Incorrect location as input
- Better CSS
- fetching API Key from backend
- Optimization of extractRequiredWeatherInfo function
  - entire days isn't necessary as only few parts of that nested json within the
   array is used
- Optimization of current forecast html & better handling of js
- Input Validation
---

--- Details about the API

- The Visual Crossing Weather API gives the data for 15 days incl. current day
- days - Array of objects
- hours - Array of objects
- Example: Temp at hour 23:00
  - json.days[0].hours[23].temp
  - json.days[dayCount].hours[hourOfDay].datetime
  - days[dayCount]; returns object
    - dayCount ∈ W ∩ [0,14]
  - ## hours[hourOfDay]; returns object - hourOfDay ∈ W ∩ [0,23]
    Expecting this type of Sample extracted JSON

```
{
  "resolvedAddress": "Seattle, WA, United States",
  "description": "Similar temperatures continuing with a chance of rain multiple days.",
  "currentConditions.temp": 33.2,
  "currentConditions.sunrise": "07:17:32",
  "currentConditions.sunset": "17:30:16",
  "days": [
      {
          "datetime": "2025-02-13",
          "tempmax": 38.5,
          "tempmin": 26.6,
          "temp": 33.1,
          "precipprob": 39,
          "sunrise": "07:17:32",
          "sunset": "17:30:16",
          "hours": [
          {
              "datetime": "00:00:00",
              "temp": 30.1,
              "precipprob": 0,
              "conditions": "Clear",
              "icon": "clear-night"
          },
          {
              "datetime": "01:00:00",
              "temp": 30.1,
              "precipprob": 0,
              "conditions": "Clear",
              "icon": "clear-night"
          },
          {
              "datetime": "02:00:00",
              "temp": 28.9,
              "precipprob": 0,
              "conditions": "Clear",
              "icon": "clear-night"
          },
          {
              "datetime": "03:00:00",
              "temp": 28.3,
              "precipprob": 0,
              "conditions": "Clear",
              "icon": "clear-night"
          },
          {
              "datetime": "04:00:00",
              "temp": 27.6,
              "precipprob": 0,
              "conditions": "Clear",
              "icon": "clear-night"
          },
          {
              "datetime": "05:00:00",
              "temp": 26.8,
              "precipprob": 0,
              "conditions": "Clear",
              "icon": "clear-night"
          },
          {
              "datetime": "06:00:00",
              "temp": 26.6,
              "precipprob": 0,
              "conditions": "Clear",
              "icon": "clear-night"
          },
          {
              "datetime": "07:00:00",
              "temp": 27.2,
              "precipprob": 0,
              "conditions": "Clear",
              "icon": "clear-night"
          },
          {
              "datetime": "08:00:00",
              "temp": 30.7,
              "precipprob": 0,
              "conditions": "Clear",
              "icon": "clear-day"
          },
          {
              "datetime": "09:00:00",
              "temp": 34.2,
              "precipprob": 0,
              "conditions": "Clear",
              "icon": "clear-day"
          },
          {
              "datetime": "10:00:00",
              "temp": 37,
              "precipprob": 0,
              "conditions": "Clear",
              "icon": "clear-day"
          },
          {
              "datetime": "11:00:00",
              "temp": 38.5,
              "precipprob": 0,
              "conditions": "Partially cloudy",
              "icon": "partly-cloudy-day"
          },
          {
              "datetime": "12:00:00",
              "temp": 38.5,
              "precipprob": 0,
              "conditions": "Partially cloudy",
              "icon": "partly-cloudy-day"
          },
          {
              "datetime": "13:00:00",
              "temp": 37.9,
              "precipprob": 0,
              "conditions": "Overcast",
              "icon": "cloudy"
          },
          {
              "datetime": "14:00:00",
              "temp": 37,
              "precipprob": 0,
              "conditions": "Overcast",
              "icon": "cloudy"
          },
          {
              "datetime": "15:00:00",
              "temp": 37,
              "precipprob": 0,
              "conditions": "Overcast",
              "icon": "cloudy"
          },
          {
              "datetime": "16:00:00",
              "temp": 35.2,
              "precipprob": 0,
              "conditions": "Overcast",
              "icon": "cloudy"
          },
          {
              "datetime": "17:00:00",
              "temp": 35.1,
              "precipprob": 0,
              "conditions": "Overcast",
              "icon": "cloudy"
          },
          {
              "datetime": "18:00:00",
              "temp": 34.4,
              "precipprob": 0,
              "conditions": "Overcast",
              "icon": "cloudy"
          },
          {
              "datetime": "19:00:00",
              "temp": 34.3,
              "precipprob": 0,
              "conditions": "Overcast",
              "icon": "cloudy"
          },
          {
              "datetime": "20:00:00",
              "temp": 34.5,
              "precipprob": 0,
              "conditions": "Overcast",
              "icon": "cloudy"
          },
          {
              "datetime": "21:00:00",
              "temp": 35,
              "precipprob": 27,
              "conditions": "Overcast",
              "icon": "cloudy"
          },
          {
              "datetime": "22:00:00",
              "temp": 35,
              "precipprob": 33,
              "conditions": "Overcast",
              "icon": "cloudy"
          },
          {
              "datetime": "23:00:00",
              "temp": 35,
              "precipprob": 39,
              "conditions": "Overcast",
              "icon": "cloudy"
          }
        ]
      },
      {
          "datetime": "2025-02-14",
          "tempmax": 42,
          "tempmin": 33,
          "precipprob": 66,
          "sunrise": "07:15:53",
          "sunset": "17:31:50",
          "conditions": "Rain, Partially cloudy",
          "icon": "rain"
      }
  ]
}
```

---

- Need to extract data from a nested json, these are the 2 ways to extract it, however the way I'm trying to extract data, this might need the obj check first & then assign to our extractedData obj.
  ```js
    json[currentConditions][temp]
    json.currentConditions.temp
  ```
  extractedData[temp] = json[currentConditions][temp]

---

- I've got a super large json from which I need to extract only specific fields that I'm planning to use for the weather app. Looking how I can achieve it efficiently instead of writing each & every assignment

  - One way is to, but I feel we need to write a lot of properties twice

    ```js
      const { resolvedAddress, description } = json;
      const obj = { resolvedAddress, description };

    ```

  - Okay so the one of the clean & concise way would be to define all the values
    we need in an array & use reduce to create our object. Like below 👇

    ```js
        const fields = ["resolvedAddress", "description"];

        const extractedData = fields.reduce((obj, field) => {
          if (json[field] != undefined) {
            obj[field] = json[field];
          }
          return obj;
        }, {});
    ```

---
