### Issues/Challenges faced [Not exhaustive]

- Having a bucket with only one Node is kinda not scalable, so we need to save the values in a such a way that while retrieval we can still differentiate those values with different keys :); the `hashCode` would only help us to know which bucket we need to go!

- Initially I've assumed to set the capacity size but since they're the current number of buckets it needs to be dynamic to calculate the proper growth factor

### Notes

- We find the `hashCode` to see which bucket the current key belongs to!

- Using that `hashCode` we can filter out the bucket we are looking for

- Using LinkedLists as buckets, so we wouldn't need to worry about storing more than one value :)

- THe container wouldn't be cleared & stay put after removing it's last node present in it

- The structure as of 3/1 is an array (`bucketContainer`) containing 16 linked lists (`buckets`) to begin with & need to implement - grow the buckets if the entries is more than the product of capacity & load factor :)

- Ideally only one node max. per bucket or else there would be a chance for collision

- The `capacity` is the total number of buckets we currently have.

- The `load factor` is a number that we assign our hash map to at the start. It’s the factor that will determine when it is a good time to grow our buckets array. Hash map implementations across various languages use a `load factor` between 0.75 and 1.

- Having keys only of type `string`

- For more theoretical details, refer [theOdinProject's hashmap](https://www.theodinproject.com/lessons/javascript-hashmap-data-structure)

### Need to:

- Update the contains method of linkedlist based on keys too to use w hashmap :)
