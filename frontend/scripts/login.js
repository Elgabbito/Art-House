const userEmail = document.getElementById("email-input");
const submitBtn = document.querySelector("#submit-link");
const passwordInput = document.getElementById("password-input");
const showPasswordBtn = document.getElementById("show-password");
const showPasswordEl = document.getElementById("show-password-img");

import { baseServerUrl } from "../baseServerUrl.mjs";
import {
	ValidateEmail,
	ValidatePassword,
	ShowOrHidePassword,
} from "./signup.js";

console.log(showPasswordBtn);
showPasswordBtn.addEventListener("click", (e) => {
	e.preventDefault();
	ShowOrHidePassword(passwordInput);
});
userEmail.addEventListener("change", ValidateEmail);
passwordInput.addEventListener("input", () => ValidatePassword(passwordInput));
submitBtn.addEventListener("click", handleLogin);

async function handleLogin() {
	const result = await login({
		email: userEmail.value,
		password: passwordInput.value,
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
