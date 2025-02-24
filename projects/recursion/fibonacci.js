// The fibonacci sequence follows a pattern where the next number would be sum of prev 2 numbers
// 0, 1, 0 + 1, 1 + 1, 1 + 2, 2 + 3, 8, 13, 21, ...
//--------------------------------------------------------------------------------
let fibRecursion = (n) => {
  let res = [];
  let prev = 0;
  let curr = 1;
  f(res, prev, curr, --n);
  return res;
};
let next;
function f(res, prev, curr, n) {
  res.push(prev);
  if (n === 0) return;
  next = prev + curr;
  prev = curr;
  curr = next;
  f(res, prev, curr, --n);
}

fibRecursion(10);
//--------------------------------------------------------------------------------
// -- Iterative approach
let fibIteration = (n) => {
  let res = [];
  let prev = 0;
  let curr = 1;

  let next;
  while (n--) {
    res.push(prev);
    next = prev + curr;
    prev = curr;
    curr = next;
  }
  return res;
};

fibIteration(10);
