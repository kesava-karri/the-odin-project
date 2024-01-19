const removeFromArray = function(arr, ...args) {
  // iterate over the items to be removed.
  // for each of the item to be removed iterate over the given arr & collect
  // the updated array.
  // In the updated array check for other elements to be removed
  args.forEach(element => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === element) {
        arr.splice(i, 1);
        console.log(arr);
      }
    }
  });
  return arr;
};

// using filter
(function (arr, ...args) {
  let array = [];
  arr.filter((item => {
    if (!args.includes(item)) {
      array.push(item);
    }
  }));
  return array;
});

// Do not edit below this line
module.exports = removeFromArray;
