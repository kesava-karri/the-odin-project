const email = document.querySelector("#email");
console.log(email.validity);
// Usage of Constraint Validation API :)
email.addEventListener("input", function(event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("Expecting email address");
  } else if (email.validity.tooShort) {
    email.setCustomValidity("email too short");
  } else {
    email.setCustomValidity("");
  }
});