### Description

- Access Live Deployment: [here](https://kesava-karri.github.io/the-odin-project/javascript/intermediate-js/client-side-form-validation-w-js/form-validation-using-only-js/index.html)

#### Regex pattern description for password field

- _^_ indicates the start of string
- _$_ indicates the end of string

- _(?= )_ lookahead syntax - without consuming characters
- _.\*_ to search entire string & means any character (.), any number of times (\*) including zero
- _[a-z]_ indicates any lowercase letter
- So combining these _(?=.\*[a-z])_ would mean at least one lowercase letter

- _[A-Z]_ indicates any uppercase letter
- _\d_ implies any digit from [0-9]
- Any special characters can be inlcuded within the square brakcets like _[!@#$%^&*]_
- After making one of each token mandatory, matching the entire part to _[A-Za-z\d!@#$%^&*]{5,}_

- `pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,}$"`

#### Skills Demonstrated

- This project shows the demonstration of the following skills
  - Client side validation using JavaScript
  - Complex regex for password field

### Read my insights about Form Validation with JavaScript [here](https://www.showwcase.com/article/43988/day-25-intermediate-js-form-validation-constraint-validation-api)
