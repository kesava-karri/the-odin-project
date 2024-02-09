const fibonacci = function(num) {
  if (num < 0) return "OOPS";
  let first =  1;
  let second = 1;
  let ans = 0;
  num = parseInt(num);
  if (num === 1 || num == 2) return 1;

  while (num > 2) {
    // 1, 1, 2, 3
    ans = first + second;
    first = second;
    second = ans;
    num--;
  }
  return ans;
};

// Do not edit below this line
module.exports = fibonacci;
