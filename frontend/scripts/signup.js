const letter = document.getElementById("letter");
const number = document.getElementById("number");
const length = document.getElementById("length");
const capital = document.getElementById("capital");
const errorMsg = document.querySelector(".error-msg");
const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const userTypes = document.querySelectorAll(".radio-btn");
const specialChar = document.getElementById("special_char");
const passwordInput = document.getElementById("password-input");
const showPasswordEl = document.getElementById("show-password-img");
const showPasswordBtn = document.getElementById("show-password");
const signupBtn = document.getElementById("submit-link");
const userSignupData = {
	name: "",
	email: "",
	password: "",
	user_role: "",
};
showPasswordBtn.addEventListener("click", (e) => {
	e.preventDefault();
	ShowOrHidePassword(passwordInput);
});
if (nameInput) {
	nameInput.addEventListener("change", ValidateName);
}
if (emailInput) {
	emailInput.addEventListener("change", () => ValidateEmail());
}
if (passwordInput) {
	passwordInput.addEventListener("input", () =>
		ValidatePassword(passwordInput)
	);
}
if (signupBtn) {
	signupBtn.addEventListener("click", handleSignup);
}
// Username validation
export function ValidateName(nameInput) {
	// console.log(username.value.length);
	if (nameInput.value === "") {
		nameInput.classList.toggle("error");
		document.getElementById("name_error").classList.remove("hide");
		document.getElementById("name_error").classList.add("show");
		return false;
	}
	if (nameInput.value.length >= 3) {
		nameInput.classList.toggle("correct");
		document.getElementById("name_error").classList.add("hide");
		document.getElementById("name_error").classList.remove("show");
		return true;
	} else {
		nameInput.classList.toggle("error");
		document.getElementById("name_error").classList.remove("hide");
		document.getElementById("name_error").classList.add("show");
		return false;
	}
}
// Email validation
export function ValidateEmail() {
	const emailInput = document.getElementById("email-input");
	const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (emailInput.value === "") {
		emailInput.classList.toggle("error");
		document.getElementById("email_error").classList.remove("hide");
		document.getElementById("email_error").classList.add("show");
		return false;
	}
	if (emailRegex.test(emailInput.value)) {
		emailInput.classList.toggle("correct");
		document.getElementById("email_error").classList.add("hide");
		document.getElementById("email_error").classList.remove("show");
		return true;
	}
	emailInput.classList.toggle("error");
	document.getElementById("email_error").classList.remove("hide");
	document.getElementById("email_error").classList.add("show");
	return false;
}
// Check if the password is strong enough
export function ValidatePassword(passwordInput) {
	// Validate lowercase letters
	let lowerCaseLetters = /[a-z]/g;
	if (passwordInput.value.match(lowerCaseLetters)) {
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
	// console.log(passwordInput.value.match(SpecialCharacters));
	if (passwordInput.value.match(SpecialCharacters)) {
		specialChar.classList.remove("invalid");
		specialChar.classList.add("valid");
	} else {
		specialChar.classList.remove("valid");
		specialChar.classList.add("invalid");
		return false;
	}

	// Validate capital letters
	let upperCaseLetters = /[A-Z]/g;
	if (passwordInput.value.match(upperCaseLetters)) {
		capital.classList.remove("invalid");
		capital.classList.add("valid");
	} else {
		capital.classList.remove("valid");
		capital.classList.add("invalid");
		return false;
	}

	// Validate numbers
	let numbers = /[0-9]/g;
	if (passwordInput.value.match(numbers)) {
		number.classList.remove("invalid");
		number.classList.add("valid");
	} else {
		number.classList.remove("valid");
		number.classList.add("invalid");
		return false;
	}

	// Validate length
	if (passwordInput.value.length >= 8) {
		length.classList.remove("invalid");
		length.classList.add("valid");
	} else {
		length.classList.remove("valid");
		length.classList.add("invalid");
		return false;
	}
	return true;
}

export function ShowOrHidePassword(passwordInput) {
	const showPasswordEl = document.querySelector("#show-password-img");
	if (passwordInput.type === "password") {
		passwordInput.type = "text";
		showPasswordEl.src = " ../images/eye-slash.svg";
	} else {
		passwordInput.type = "password";
		showPasswordEl.src = "../images/eye-show.svg";
	}
}

export async function handleSignup() {
	// Run all checks
	const AllTrue =
		ValidateName() && ValidateEmail() && ValidatePassword(passwordInput);

	// Set user data
	userSignupData.name = nameInput.value;
	userSignupData.email = emailInput.value;
	userSignupData.password = passwordInput.value;
	userTypes.forEach((btn) => {
		// Get user type
		if (btn.checked) {
			userSignupData.role = btn.value;
		}
	});

	// console.log(AllTrue);
	// console.log(userSignupData);

	// Check if all data is valid and send signup request
	if (AllTrue) {
		try {
			const result = await signup(userSignupData);
			console.log(result);
			if (result.status == 200) {
				addNotification("Signup Successful", true);
				setTimeout(() => {}, 1000);
				window.open("../pages/login.html", "_self");
				return;
			}
			if (result.code === "23505") {
				addNotification("Email already exists", false);
				return;
			}
			addNotification("Sorry there was an error, try again", false);
		} catch (error) {
			addNotification("Sorry there was an error, try again", false);
			throw error;
		}
	}
}
async function signup(data) {
	const url = `${baseServerUrl()}/auth/signup`;
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		console.log(response);
		if (!response.ok) {
			console.error(`HTTP Error status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		throw error;
	}
}
