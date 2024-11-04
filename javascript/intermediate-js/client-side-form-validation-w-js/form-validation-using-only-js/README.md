### Regex pattern description for password field

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
