const palindromes = function (string) {
  // From the tests it is evident that punctuation must be removed,
  // case should be ignored
  // also trim spaces if necessary :)
  
  // have 2 pointers from start & end of string & compare
  // when they cross each other the check would be true :)
  string = string.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = string.length - 1;
  
  while (left <= right) {
    if (string.charAt(left) !== string.charAt(right)) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};

// Do not edit below this line
module.exports = palindromes;
