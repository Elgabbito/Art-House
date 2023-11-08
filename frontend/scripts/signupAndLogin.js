const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const length = document.getElementById("length");
const specialChar = document.getElementById("special_char");
const username = document.getElementById("name-input");
const userEmail = document.getElementById("email-input");
const userPassword = document.getElementById("password-input");
const ConfirmPassword = document.getElementById("confirm_password_input");
const AllChecks = {
  lowercase: false,
  uppercase: false,
  hasNumber: false,
  hasSpecialChar: false,
  isLongEnough: false,
};

// Username validation
function ValidateName() {
  console.log(username.value.length);
  if (username.value === "") {
    username.classList.toggle("error");
    document.getElementById("name_error").classList.remove("hide");
    document.getElementById("name_error").classList.add("show");
  }
  if (username.value.length >= 3) {
    username.classList.toggle("correct");
    document.getElementById("name_error").classList.add("hide");
    document.getElementById("name_error").classList.remove("show");
  } else {
    username.classList.toggle("error");
    document.getElementById("name_error").classList.remove("hide");
    document.getElementById("name_error").classList.add("show");
  }
}
// Email validation
function ValidateEmail() {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (userEmail.value === "") {
    username.classList.toggle("error");
    document.getElementById("email_error").classList.remove("hide");
    document.getElementById("email_error").classList.add("show");
  }
  if (emailRegex.test(userEmail.value)) {
    userEmail.classList.toggle("correct");
    document.getElementById("email_error").classList.add("hide");
    document.getElementById("email_error").classList.remove("show");
  } else {
    userEmail.classList.toggle("error");
    document.getElementById("email_error").classList.remove("hide");
    document.getElementById("email_error").classList.add("show");
  }
}
// Check if the password is strong enough
function ValidatePassword() {
  // Validate lowercase letters
  let lowerCaseLetters = /[a-z]/g;
  if (userPassword.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
    AllChecks.lowercase = true;
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
    AllChecks.lowercase = false;
  }

  // Validate Special Characters letters
  let SpecialCharacters =
    /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
  console.log(userPassword.value.match(SpecialCharacters));
  if (userPassword.value.match(SpecialCharacters)) {
    specialChar.classList.remove("invalid");
    specialChar.classList.add("valid");
    AllChecks.hasSpecialChar = true;
  } else {
    specialChar.classList.remove("valid");
    specialChar.classList.add("invalid");
    AllChecks.hasSpecialChar = false;
  }

  // Validate capital letters
  let upperCaseLetters = /[A-Z]/g;
  if (userPassword.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
    AllChecks.uppercase = true;
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
    AllChecks.uppercase = false;
  }

  // Validate numbers
  let numbers = /[0-9]/g;
  if (userPassword.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
    AllChecks.hasNumber = true;
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
    AllChecks.hasNumber = false;
  }

  // Validate length
  if (userPassword.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
    AllChecks.isLongEnough = true;
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
    AllChecks.isLongEnough = false;
  }

  function checkAllValuesAreTrue(obj) {
    const checkedValues = [];
    const keyList = Object.keys(obj);
    for (let i = 0; i < keyList.length; i++) {
      let prop = Object.keys(obj)[i];
      checkedValues.push(obj[prop]);
    }
    let AllTrue = checkedValues.includes(false);

    if (AllTrue) {
      document
        .getElementById("password_error")
        .classList.remove("dont_display");
      document
        .getElementById("password_error")
        .classList.add("display_element");
    }
  }
  checkAllValuesAreTrue(AllChecks);
}

function ShowOrHidePassword() {
  if (userPassword.type === "password") {
    userPassword.type = "text";
  } else {
    userPassword.type = "password";
  }
}

async function handleSignup() {
  ValidateName();
  ValidateEmail();
  ValidatePassword();
  let AllTrue;
  function checkAllValuesAreTrue(obj) {
    const checkedValues = [];
    const keyList = Object.keys(obj);
    for (let i = 0; i < keyList.length; i++) {
      let prop = Object.keys(obj)[i];
      checkedValues.push(obj[prop]);
    }
    AllTrue = checkedValues.includes(false);

    if (AllTrue) {
      document
        .getElementById("password_error")
        .classList.remove("dont_display");
      document
        .getElementById("password_error")
        .classList.add("display_element");
    }
  }
  checkAllValuesAreTrue(AllChecks);
  console.log(AllTrue);
  const userData = {
    name: username.value,
    email: userEmail.value,
    password: userPassword.value,
  };
  console.log(userData);

  // Check if all data is valid and send signup request
  if (!AllTrue) {
    const result = await signup(userData);
    console.log(result);
    window.open("../pages/login.html", "_self");
  }
}

async function handleLogin() {
  const userData = {
    email: userEmail.value,
    password: userPassword.value,
  };
  console.log(userData);
  const result = await login(userData);
  localStorage.setItem("token", result.token);
  console.log(result);
}

// HTTP Requests
async function signup(data) {
  const url = "http://localhost:3000/auth/signup";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(`HTTP Error status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function login(data) {
  const url = "http://localhost:3000/auth/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(`HTTP Error status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
