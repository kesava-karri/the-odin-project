// -----------------------------------------------------------------------------
let p = new Promise(executor);
function executor(resolveFunc, rejectFunc) {
  let a = 1 + 1;
  if (a === 2) {
    resolveFunc("Success!");
  } else {
    rejectFunc("Reject");
  }
}

p.then((result) => console.log(result));
// -----------------------------------------------------------------------------
