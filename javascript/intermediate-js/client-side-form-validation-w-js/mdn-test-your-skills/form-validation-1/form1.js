const form = document.querySelector("form");
const uname = document.querySelector("#uname");
const email = document.querySelector("#email");
const phone = document.getElementById("phone");
const comment = document.querySelector("#comment");

const unameError = document.querySelector("#uname + span.error");
const emailError = document.querySelector("#email + span.error");
const phoneError = document.querySelector("#phone + span.error");
const commentError = document.querySelector("#comment + span.error");

form.addEventListener("submit", (event) => {
  if (!uname.validity.valid) {
    showUNameError();
    event.preventDefault();
  } else if (!email.validity.valid) {
    showEmailError();
    event.preventDefault();
  } else if (!phone.validity.valid) {
    showPhoneError();
    event.preventDefault();
  } else if (!comment.validity.valid) {
    showCommentError();
    event.preventDefault();
  }
});

uname.addEventListener("input", (event) => {
  if (uname.validity.valid) {
    unameError.textContent = "";
    unameError.className = "error";
  } else {
    showUNameError();
  }
});

email.addEventListener("input", (event) => {
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.className = "error";
  } else {
    showEmailError();
  }
});

comment.addEventListener("input", (event) => {
  if (comment.validity.valid) {
    commentError.textContent = "";
    commentError.className = "error";
  } else {
    showCommentError();
  }
});

phone.addEventListener("input", (event) => {
  if (phone.validity.valid) {
    phoneError.textContent = "";
    phoneError.className = "error";
  } else {
    showPhoneError();
  }
});

const showUNameError = () => {
  if (uname.validity.valueMissing) {
    unameError.textContent = "You need to enter username.";
  } else if (uname.validity.typeMismatch) {
    unameError.textContent = "Entered value needs to be a text";
  } else if (uname.validity.tooShort) {
    unameError.textContent = `Username should be at least ${uname.minLength} characters; you entered ${uname.value.length}.`;
  } else if (uname.validity.tooLong) {
    unameError.textContent = `Username should only have a max length of ${uname.maxLength} characters; you entered ${uname.value.length}.`;
  }

  unameError.className = "error active";
};

const showEmailError = () => {
  if (email.validity.valueMissing) {
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be an email address.";
  }

  emailError.className = "error active";
};

const showPhoneError = () => {
  if (phone.validity.valueMissing) {
    phoneError.textContent = "You need to enter the phone number.";
  } else if (phone.validity.patternMismatch) {
    phoneError.textContent =
      "Entered value needs to be a phone number in the format:  123-456-7890";
  } else if (phone.validity.typeMismatch) {
    phoneError.textContent = "Entered value needs to be a phone number";
  } else if (phone.validity.tooLong) {
    phoneError.textContent = `The phone number should only have a max length of ${phone.maxLength} characters; you entered ${phone.value.length}.`;
  }

  phoneError.className = "error active";
};

const showCommentError = () => {
  if (comment.validity.valueMissing) {
    commentError.textContent = "You need to enter a comment.";
  } else if (comment.validity.typeMismatch) {
    commentError.textContent = "Entered value needs to be text";
  } else if (comment.validity.tooLong) {
    commentError.textContent = `The comment should only have a max length of ${comment.maxLength} characters; you entered ${comment.value.length}.`;
  }

  commentError.className = "error active";
};
