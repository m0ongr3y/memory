// USER input managment

// USER - verification of condition
const userInput = document.getElementById("username");

function validateUser(user) {
  let minUserLength = 3;
  const errorUser = [];

  if (userInput.value.length < minUserLength) {
    errorUser.push(
      "Le nom d'utilisateur doit comporter au moins 3 caractères."
    );
  }

  return errorUser;
}

// USER - errors display
let errorsUser = [];
userInput.addEventListener("blur", function () {
  const errorsUser = validateEmail(userInput.value);
  displayErrors(errorsUser);
});

// EMAIL input managment

// EMAIL - verification of condition

const emailInput = document.getElementById("email");

function validateEmail(email) {
  const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;   // from REGEX101 website
  console.log(emailRegex.test(emailInput.value));

  const errorEmail = [];
  if (!emailRegex.test(emailInput.value)) {
    errorEmail.push(
      "Ceci n'est pas une adresse mail valide. Recommence suivant l'exemple."
    );
  }
  console.log(errorEmail);
  return errorEmail;
}

// EMAIL - errors display
let errorsEmail = [];
emailInput.addEventListener("blur", function () {
  const errorsEmail = validateEmail(emailInput.value);
  displayErrors(errorsEmail);
});

// PASSWORD  input managment

// PASSWORD  verification condition - checking if complies with the set conditions, returning errors if errors

const passwordInput = document.getElementById("passwordInput");
const passwordConfirmInput = document.getElementById("passwordConfirmInput");
const errorMessages = document.getElementById("errorMessages");

function validatePassword(password) {
  const requirements = {
    minLength: 6,
    hasDigits: /\d/,
    hasSpecialChars: /[$&+,:;=?@#|'<>.^*()%!-]/,
  };

  const errors = [];

  if (password.length < requirements.minLength) {
    errors.push("Mot de passe doit contenir au moins 6 caracètres.");

    if (!requirements.hasDigits.test(password)) {
      errors.push("Mot de passe doit contenir au moins un chiffre.");
    }

    if (!requirements.hasSpecialChars.test(password)) {
      errors.push("Mot de passe doit contenir au moins un caractère spé.");
    }
    console.log(errors);
    return errors;
  }
}

// PASSWORD  - errors display

passwordInput.addEventListener("blur", function () {
  const password = passwordInput.value;
  const errors = validatePassword(password);

  displayErrors(errors);
});

// PASSWORD CONFIRMATION input managment

// PASSWORD CONFIRMATION verification condition

function validateConfirmedPassword(password, passwordConfirm) {
  const errorsConfirmPswd = [];
  if (password !== passwordConfirm) {
    errorsConfirmPswd.push(
      "Les mots de passe ne sont pas identiques. Do it again pls."
    );

    return errorsConfirmPswd;
  }
}

// PASSWORD CONFIRMATION - errors display

let errorsConfirmPswd = [];

passwordConfirmInput.addEventListener("mouseout", function () {
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  errorsConfirmPswd = validateConfirmedPassword(password, passwordConfirm);

  if (password === passwordConfirm) {
    console.log("password ok");
  }
  //else alert("Les mots de passe ne sont pas identiques, refais en mieux!")

  displayErrors(errorsConfirmPswd);
});

// GLOBAL ERROR DISPLAY FUNCTION

function displayErrors(errors) {
  errorMessages.innerHTML = ""; // line to clear the previous input from user

  if (errors.length > 0) {
    const errorsList = document.createElement("ul"); // initiate the list element if there are errors
    errors.forEach((error) => {
      const listItem = document.createElement("li"); // list each error as bullet point
      listItem.textContent = error;
      errorsList.appendChild(listItem);
    });
    errorMessages.appendChild(errorsList);
  }
}
