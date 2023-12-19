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
const showPasswordBtn = document.getElementById("show-password");
const userPassword = document.getElementById("password-input");
const passwordImg = document.getElementById("show-password-img");
import { baseServerUrl } from "../baseServerUrl.mjs";
const userSignupData = {
	name: "",
	email: "",
	password: "",
	user_role: "",
};
showPasswordBtn.addEventListener("click", (e) => {
	e.preventDefault();
	ShowOrHidePassword(
		passwordImg,
		"../images/eye-show.svg",
		" ../images/eye-slash.svg"
	);
});
userEmail.addEventListener("change", ValidateEmail);
userPassword.addEventListener("input", ValidatePassword);
submitBtn.addEventListener("click", handleLogin);

// Username validation
export function ValidateName() {
	// console.log(username.value.length);
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
export function ValidateEmail() {
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
export function ValidatePassword() {
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
	// console.log(userPassword.value.match(SpecialCharacters));
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

export function ShowOrHidePassword(showPasswordImg, showImg, hideImg) {
	if (userPassword.type === "password") {
		userPassword.type = "text";
		showPasswordImg.src = hideImg;
	} else {
		userPassword.type = "password";
		showPasswordImg.src = showImg;
	}
}

export async function handleSignup() {
	// Run all checks
	const AllTrue = ValidateName() && ValidateEmail() && ValidatePassword();

	// Set user data
	userSignupData.name = username.value;
	userSignupData.email = userEmail.value;
	userSignupData.password = userPassword.value;
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
async function handleLogin() {
	const result = await login({
		email: userEmail.value,
		password: userPassword.value,
	});
	localStorage.setItem("token", result.token);
	localStorage.setItem("role", result.role);
	localStorage.setItem("username", result.user);
	if (result.status == 200) {
		addNotification("Login Successful", true);
		window.open("../index.html", "_self");
		console.log(result);
		return;
	}
	console.log(result);
	if (result.status == 401) {
		// errorMsg.classList.remove("hide");
		// errorMsg.classList.add("show");
		addNotification("Invalid email or Password", false);
		return;
	}
}

// HTTP Requests
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

async function login(data) {
	const url = `${baseServerUrl()}/auth/login`;
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
function addNotification(message, success) {
	//create notification
	const NotiElement = document.createElement("div");
	NotiElement.id = "stickyNotification";
	NotiElement.style.display = "flex";
	NotiElement.style.alignItems = "center";
	NotiElement.style.position = "absolute";
	NotiElement.style.width = "max-content";
	NotiElement.style.height = "max-content";
	NotiElement.style.padding = "10px";
	NotiElement.style.borderRadius = "5px";
	NotiElement.style.border = "1px solid black";
	NotiElement.style.backgroundColor = success ? "rgb(26, 255, 60)" : "red";
	NotiElement.style.color = success ? "#302c1b" : "#fae6c7";
	NotiElement.style.left = "50%";
	NotiElement.style.top = "0";
	NotiElement.style.transform = "translate(-50%, 50%)";

	NotiElement.innerHTML = ` <span>${message}.</span><div id='closeBtn'>X</div>`;
	document.body.appendChild(NotiElement);
	//keep it always at the bottom corner of the window
	document.addEventListener("scroll", () => {
		let btmPos = -window.scrollY + 10;
		NotiElement.style.bottom = btmPos + "px";
	});
	// Remove popup
	// By timer
	setTimeout(() => document.body.removeChild(NotiElement), 5000);
	// By button click
	document.getElementById("closeBtn").addEventListener("click", () => {
		document.body.removeChild(NotiElement);
	});
}
