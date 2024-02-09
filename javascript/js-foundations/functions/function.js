// ----------------------------------------------
// Rewrite the function using '?' or '||'
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('Did parents allow you?');
  }
}

function checkAge(age) {
  return age > 18 ? true : confirm('Did parents allow you?');
}

function checkAge(age) {
  return age > 18 || confirm('Did parents allow you?');
} 
// ----------------------------------------------
// Write a function min(a,b) which returns the least of two numbers a and b.
function min(a, b) {
  return a < b ? a : b;
}
// ----------------------------------------------
// Write a function pow(x,n) that returns x in power n.
function pow(x, n) {
  return x ** n;
  // return Math.pow(x, n);
}

