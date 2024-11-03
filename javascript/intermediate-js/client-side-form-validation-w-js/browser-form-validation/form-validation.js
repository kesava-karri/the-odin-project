const email = document.querySelector("#email");
const country = document.querySelector("#select-country");
const zipcode = document.querySelector("#zipcode");
const password = document.querySelector("#pass");

const handleInputValidation = (e) => {
  if (e.currentTarget.validity.valid) {
    const errorEle = document.querySelector(`#${e.currentTarget.id} + .error`);
    errorEle.textContent = "";
    e.currentTarget.classList.remove("error");
  } else {
    showError(e.currentTarget);
  }
};

email.addEventListener("input", (e) => handleInputValidation(e));
country.addEventListener("input", (e) => handleInputValidation(e));
zipcode.addEventListener("input", (e) => handleInputValidation(e));
password.addEventListener("input", (e) => handleInputValidation(e));

const showError = (inputEle) => {
  inputEle.classList.add("error");

  const errorEle = document.querySelector(`#${inputEle.id} + .error`);
  if (inputEle === zipcode) {
    if (inputEle.validity.patternMismatch) {
      errorEle.textContent = "Please enter numeric zipcode, Ex: 98006";
    } else if (inputEle.validity.tooShort || inputEle.validity.tooLong) {
      errorEle.textContent = `Length of ${inputEle.value} is ${inputEle.value.length}, the length should be ${inputEle.maxLength}`;
    }
  } else if (inputEle === password) {
    if (inputEle.validity.tooShort) {
      errorEle.textContent = `Password is too short, length: ${inputEle.value.length}, minimum length: ${inputEle.minLength}`;
    } else if (inputEle.validity.patternMismatch) {
      errorEle.textContent =
        "Please include at least one upper & lowercase letters, one symbol (!@#$%^&*) and one number";
    }
  } else {
    errorEle.textContent = inputEle.validationMessage;
  }
};

const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  if (!email.validity.valid) {
    showError(email);
  } else if (!country.validity.valid) {
    showError(country);
  } else if (!zipcode.validity.valid) {
    showError(zipcode);
  } else if (!password.validity.valid) {
    showError(password);
  }
  e.preventDefault();
});
