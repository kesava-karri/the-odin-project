// Call async from non-async
async function wait() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  let promise = wait();
  return promise.then((res) => alert(res));

  // ...what should you write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
}

f();
