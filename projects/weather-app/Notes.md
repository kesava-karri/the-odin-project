--- Details about the API
- The Visual Crossing Weather API gives the data for 15 days incl. current day
- days - Array of objects
- hours - Array of objects
- Example: Temp at hour 23:00
  - json.days[0].hours[23].temp
  - json.days[dayCount].hours[hourOfDay].datetime
  - days[dayCount]; returns object
    - dayCount ∈ W ∩ [0,14]
  - hours[hourOfDay]; returns object
    - hourOfDay ∈ W ∩ [0,23]
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
