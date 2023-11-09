const letter = document.getElementById("letter");
const number = document.getElementById("number");
const length = document.getElementById("length");
const capital = document.getElementById("capital");
const errorMsg = document.querySelector(".error-msg");
const username = document.getElementById("name-input");
const userEmail = document.getElementById("email-input");
const submitBtn = document.querySelector("#submit-link");
const userTypes = document.querySelectorAll(".radio-btn");
const specialChar = document.getElementById("special_char");
const userPassword = document.getElementById("password-input");
const ConfirmPassword = document.getElementById("confirm_password_input");
const userSignupData = {
  name: "",
  email: "",
  password: "",
  role: "",
};

// Username validation
function ValidateName() {
  console.log(username.value.length);
  if (username.value === "") {
    username.classList.toggle("error");
    document.getElementById("name_error").classList.remove("hide");
    document.getElementById("name_error").classList.add("show");
    return false;
  }
  if (username.value.length >= 3) {
    username.classList.toggle("correct");
    document.getElementById("name_error").classList.add("hide");
    document.getElementById("name_error").classList.remove("show");
    return true;
  } else {
    username.classList.toggle("error");
    document.getElementById("name_error").classList.remove("hide");
    document.getElementById("name_error").classList.add("show");
    return false;
  }
}
// Email validation
function ValidateEmail() {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (userEmail.value === "") {
    username.classList.toggle("error");
    document.getElementById("email_error").classList.remove("hide");
    document.getElementById("email_error").classList.add("show");
    return false;
  }
  if (emailRegex.test(userEmail.value)) {
    userEmail.classList.toggle("correct");
    document.getElementById("email_error").classList.add("hide");
    document.getElementById("email_error").classList.remove("show");
    return true;
  } else {
    userEmail.classList.toggle("error");
    document.getElementById("email_error").classList.remove("hide");
    document.getElementById("email_error").classList.add("show");
    return false;
  }
}
// Check if the password is strong enough
function ValidatePassword() {
  // Validate lowercase letters
  let lowerCaseLetters = /[a-z]/g;
  if (userPassword.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
    return false;
  }

  // Validate Special Characters letters
  let SpecialCharacters =
    /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
  console.log(userPassword.value.match(SpecialCharacters));
  if (userPassword.value.match(SpecialCharacters)) {
    specialChar.classList.remove("invalid");
    specialChar.classList.add("valid");
  } else {
    specialChar.classList.remove("valid");
    specialChar.classList.add("invalid");
    return false;
  }

  // Validate capital letters
  let upperCaseLetters = /[A-Z]/g;
  if (userPassword.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
    return false;
  }

  // Validate numbers
  let numbers = /[0-9]/g;
  if (userPassword.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
    return false;
  }

  // Validate length
  if (userPassword.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
    return false;
  }
  return true;
}

function ShowOrHidePassword() {
  if (userPassword.type === "password") {
    userPassword.type = "text";
  } else {
    userPassword.type = "password";
  }
}

async function handleSignup() {
  // Run all checks
  const AllTrue = ValidateName() && ValidateEmail() && ValidatePassword();

  // Set user data
  userSignupData.name = username.value;
  userSignupData.email = userEmail.value;
  userSignupData.password = userPassword.value;
  userTypes.forEach((btn) => {
    if (btn.checked) {
      userSignupData.role = btn.value;
      console.log(btn, btn.value, userSignupData);
    }
  });
  // Get user type

  console.log(AllTrue);
  console.log(userSignupData);

  // Check if all data is valid and send signup request
  if (AllTrue) {
    try {
      const result = await signup(userSignupData);
      console.log(result);
    } catch (error) {
      throw error;
    }
    window.open("../pages/login.html", "_self");
  }
}
async function handleLogin() {
  const result = await login({
    email: userEmail.value,
    password: userPassword.value,
  });
  localStorage.setItem("token", result.token);
  localStorage.setItem("role", result.role);
  localStorage.setItem("username", result.user);

  console.log(result);

  if (result.message == "Invalid Password or Email") {
    errorMsg.classList.remove("hide");
    errorMsg.classList.add("show");
  }
  window.open("../index.html", "_self");
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
