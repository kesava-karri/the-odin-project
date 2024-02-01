const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");

const btn = document.querySelector(".btn");

btn.addEventListener("click", function(e) {
  if (password.textContent === confirmPassword.textContent) {
    return;
  } else {
    alert("Please double check your password");
  }
});