const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const signupBtn = document.getElementById("submit-link");
import {
	ValidateName,
	ValidateEmail,
	ValidatePassword,
	handleSignup,
} from "./login";

nameInput.addEventListener("change", ValidateName);
emailInput.addEventListener("change", ValidateEmail);
passwordInput.addEventListener("input", ValidatePassword);
signupBtn.addEventListener("click", handleSignup);
