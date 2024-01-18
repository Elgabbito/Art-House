import { baseServerUrl } from "../baseServerUrl.mjs";
import { parseJwt } from "./utils.js";
const main = document.querySelector(".profile-info");
const username = document.querySelector("#username");
const chatBtn = document.querySelector("#chats");
const myArtBtn = document.querySelector("#my-art");
const logoutBtn = document.querySelector("#logout-btn");
const settingsBtn = document.querySelector("#settings");
const newNameInput = document.querySelector("#name-input");
const newEmailInput = document.querySelector("#email-input");
const editProfileBtn = document.querySelector("#edit-profile");
const newPassword = document.querySelector("#new-password-input");
const oldPassword = document.querySelector("#old-password-input");

// Components
const myArtComponent = document.createElement("div");
myArtComponent.innerHTML = `<h2 id="section-title">My Art</h2>
          <div class="my-art">
            <div class="art-container">
              <h3>Purchased</h3>
              <div class="art-scroll-view">
                      <div class="art-carousel">
                        <a href="https://theartling.com/en/artwork/adrienn-krahl-time-travel-3/" class="card">
              <div class="image">
                <img src="../images/African-Landscape.jpg" alt="" />
              </div>
              <span class="title">The River's Witness</span>
              <span class="price">N 100,000</span>
                        </a>
                <div class="card">
              <div class="image">
                <img src="../images/African-Landscape.jpg" alt="" />
              </div>
              <span class="title">The River's Witness</span>
              <span class="price">N 100,000</span>
                        </div>
                        <div class="card">
              <div class="image">
                <img src="../images/African-Landscape.jpg" alt="" />
              </div>
              <span class="title">The River's Witness</span>
              <span class="price">N 100,000</span>
                        </div>
                        <div class="card">
              <div class="image">
                <img src="../images/African-Landscape.jpg" alt="" />
              </div>
              <span class="title">The River's Witness</span>
              <span class="price">N 100,000</span>
                        </div>
                        <div class="card">
              <div class="image">
                <img src="../images/African-Landscape.jpg" alt="" />
              </div>
              <span class="title">The River's Witness</span>
              <span class="price">N 100,000</span>
                        </div>
                      </div>
                    </div>
            </div>
            <div class="art-container">
              <h3>Liked</h3>
              <div class="art-scroll-view">
                <div class="art-carousel">
                  <a href="https://theartling.com/en/artwork/adrienn-krahl-time-travel-3/" class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </a>
                  <div class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </div>
                  <div class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </div>
                  <div class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </div>
                  <div class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="art-container">
              <h3>Recently Viewed</h3>
              <div class="art-scroll-view">
                
                <div class="art-carousel">
                  <a href="https://theartling.com/en/artwork/adrienn-krahl-time-travel-3/" class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </a>
                  <div class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </div>
                  <div class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </div>
                  <div class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </div>
                  <div class="card">
                    <div class="image">
                      <img src="../images/African-Landscape.jpg" alt="" />
                    </div>
                    <span class="title">The River's Witness</span>
                    <span class="price">N 100,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;

const chatComponent = document.createElement("section");
const messages = document.createElement("div");
messages.className = "messages";
messages.innerHTML = `<div class="my-msg-container">
          <div class="msg-info">
            <div class="msg-top">
              <span>Jane Cooper</span><span class="timestamp">12:30PM</span>
            </div>
            <div class="my-msg">Hi Kepler I'd like you to make a painting for me</div>
          </div>
          <div class="profile-picture">
            <img src="../images/profile-fallback.svg" alt="Profile Picture" />
          </div>
        </div>

        <div class="their-msg-container">
          <div class="profile-picture">
            <img src="../images/profile-fallback.svg" alt="Profile Picture" />
          </div>
          <div class="msg-info">
            <div class="msg-top">
              <span>Kepler Hanson</span><span class="timestamp">12:30PM</span>
            </div>
            <div class="their-msg">Hi Jane, what kind of painting are you looking for?</div>
          </div>
        </div>

        <div class="my-msg-container">
          <div class="msg-info">
            <div class="msg-top">
              <span>Jane Cooper</span><span class="timestamp">12:30PM</span>
            </div>
            <div class="my-msg">Hi Kepler I'd like you to make a painting for me</div>
          </div>
          <div class="profile-picture">
            <img src="../images/profile-fallback.svg" alt="Profile Picture" />
          </div>
        </div>

        <div class="their-msg-container">
          <div class="profile-picture">
            <img src="../images/profile-fallback.svg" alt="Profile Picture" />
          </div>
          <div class="msg-info">
            <div class="msg-top">
              <span>Kepler Hanson</span><span class="timestamp">12:30PM</span>
            </div>
            <div class="their-msg">Hi Jane, what kind of painting are you looking for?</div>
          </div>
        </div>
        <div class="my-msg-container">
          <div class="msg-info">
            <div class="msg-top">
              <span>Jane Cooper</span><span class="timestamp">12:30PM</span>
            </div>
            <div class="my-msg">Hi Kepler I'd like you to make a painting for me</div>
          </div>
          <div class="profile-picture">
            <img src="../images/profile-fallback.svg" alt="Profile Picture" />
          </div>
        </div>

        <div class="their-msg-container">
          <div class="profile-picture">
            <img src="../images/profile-fallback.svg" alt="Profile Picture" />
          </div>
          <div class="msg-info">
            <div class="msg-top">
              <span>Kepler Hanson</span><span class="timestamp">12:30PM</span>
            </div>
            <div class="their-msg">Hi Jane, what kind of painting are you looking for?</div>
          </div>
        </div>
        <div class="my-msg-container">
          <div class="msg-info">
            <div class="msg-top">
              <span>Jane Cooper</span><span class="timestamp">12:30PM</span>
            </div>
            <div class="my-msg">Hi Kepler I'd like you to make a painting for me</div>
          </div>
          <div class="profile-picture">
            <img src="../images/profile-fallback.svg" alt="Profile Picture" />
          </div>
        </div>

        <div class="their-msg-container">
          <div class="profile-picture">
            <img src="../images/profile-fallback.svg" alt="Profile Picture" />
          </div>
          <div class="msg-info">
            <div class="msg-top">
              <span>Kepler Hanson</span><span class="timestamp">12:30PM</span>
            </div>
            <div class="their-msg">Hi Jane, what kind of painting are you looking for?</div>
          </div>
        </div>
        <div class="my-msg-container">
          <div class="msg-info">
            <div class="msg-top">
              <span>Jane Cooper</span><span class="timestamp">12:30PM</span>
            </div>
            <div class="my-msg">Hi Kepler I'd like you to make a painting for me</div>
          </div>
          <div class="profile-picture">
            <img src="../images/profile-fallback.svg" alt="Profile Picture" />
          </div>
        </div>

        <div class="their-msg-container">
          <div class="profile-picture">
            <img src="../images/profile-fallback.svg" alt="Profile Picture" />
          </div>
          <div class="msg-info">
            <div class="msg-top">
              <span>Kepler Hanson</span><span class="timestamp">12:30PM</span>
            </div>
            <div class="their-msg">Hi Jane, what kind of painting are you looking for?</div>
          </div>
        </div>
        <div class="my-msg-container">
          <div class="msg-info">
            <div class="msg-top">
              <span>Jane Cooper</span><span class="timestamp">12:30PM</span>
            </div>
            <div class="my-msg">Hi Kepler I'd like you to make a painting for me</div>
          </div>
          <div class="profile-picture">
            <img src="../images/profile-fallback.svg" alt="Profile Picture" />
          </div>
        </div>

        <div class="their-msg-container">
          <div class="profile-picture">
            <img src="../images/profile-fallback.svg" alt="Profile Picture" />
          </div>
          <div class="msg-info">
            <div class="msg-top">
              <span>Kepler Hanson</span><span class="timestamp">12:30PM</span>
            </div>
            <div class="their-msg">Hi Jane, what kind of painting are you looking for?</div>
          </div>
        </div>
        <div class="my-msg-container">
          <div class="msg-info">
            <div class="msg-top">
              <span>Jane Cooper</span><span class="timestamp">12:30PM</span>
            </div>
            <div class="my-msg">Hi Kepler I'd like you to make a painting for me</div>
          </div>
          <div class="profile-picture">
            <img src="../images/profile-fallback.svg" alt="Profile Picture" />
          </div>
        </div>

        <div class="their-msg-container">
          <div class="profile-picture">
            <img src="../images/profile-fallback.svg" alt="Profile Picture" />
          </div>
          <div class="msg-info">
            <div class="msg-top">
              <span>Kepler Hanson</span><span class="timestamp">12:30PM</span>
            </div>
            <div class="their-msg">Hi Jane, what kind of painting are you looking for?</div>
          </div>
        </div>
        <div class="my-msg-container">
          <div class="msg-info">
            <div class="msg-top">
              <span>Jane Cooper</span><span class="timestamp">12:30PM</span>
            </div>
            <div class="my-msg">Hi Kepler I'd like you to make a painting for me</div>
          </div>
          <div class="profile-picture">
            <img src="../images/profile-fallback.svg" alt="Profile Picture" />
          </div>
        </div>

        <div class="their-msg-container">
          <div class="profile-picture">
            <img src="../images/profile-fallback.svg" alt="Profile Picture" />
          </div>
          <div class="msg-info">
            <div class="msg-top">
              <span>Kepler Hanson</span><span class="timestamp">12:30PM</span>
            </div>
            <div class="their-msg">Hi Jane, what kind of painting are you looking for?</div>
          </div>
        </div>
        <div class="my-msg-container">
          <div class="msg-info">
            <div class="msg-top">
              <span>Jane Cooper</span><span class="timestamp">12:30PM</span>
            </div>
            <div class="my-msg">Hi Kepler I'd like you to make a painting for me</div>
          </div>
          <div class="profile-picture">
            <img src="../images/profile-fallback.svg" alt="Profile Picture" />
          </div>
        </div>

        <div class="their-msg-container">
          <div class="profile-picture">
            <img src="../images/profile-fallback.svg" alt="Profile Picture" />
          </div>
          <div class="msg-info">
            <div class="msg-top">
              <span>Kepler Hanson</span><span class="timestamp">12:30PM</span>
            </div>
            <div class="their-msg">Hi Jane, what kind of painting are you looking for?</div>
          </div>
        </div>
`;
chatComponent.className = "chat";
chatComponent.id = "chat-container";
chatComponent.appendChild(messages);

const SettingComponent = document.createElement("section");
SettingComponent.innerHTML = ` <h2 id="section-title">Settings</h2>
          <div class="profile-data">
            <h1 class="settings-header">
              Sorry this page is currently under construction check in a little
              later
            </h1>
          </div>`;

// Event listeners
editProfileBtn.addEventListener("click", () =>
	window.open("../pages/userDashboard.html", "_self")
);
myArtBtn.addEventListener("click", () => updateView(myArtComponent, "myart"));
chatBtn.addEventListener("click", () => {
	updateView(chatComponent.outerHTML, "chat");
	scrollToBottom(".profile-info");
});
settingsBtn.addEventListener("click", () => {
	updateView(SettingComponent, "setting");
});
logoutBtn.addEventListener("click", logout);
window.addEventListener("load", loadPage);
window.addEventListener("hashchange", loadPage);

// Function Declararions
function loadPage() {
	username.innerText = `Hi, ${localStorage.getItem("username") ?? "User"}`;

	switch (removeSearchParams(window.location.href)) {
		case "#editProfile" || "":
			window.open("../pages/userDashboard.html", "_self");
			newNameInput.placeholder = localStorage.getItem("username") ?? "User";
			break;

		case "#myart":
			updateView(myArtComponent);
			// Append Art to DOM
			const art = await;
			art.forEach((data) => artDisplay.appendChild(createArtCard(data)));
			break;

		case "#chat":
			updateView(chatComponent);
			scrollToBottom(".profile-info");
			break;

		case "#setting":
			updateView(SettingComponent);
			break;

		default:
			break;
	}
}
if (document.querySelector(".user-form")) {
	document.querySelector("#update-name").addEventListener("click", () => {
		if (ValidateName(newNameInput)) {
			const newname = document.querySelector("#name-input").value;
			try {
				updateUserData({ value: newname, fieldToUpdate: "name" });
			} catch (error) {
				console.log(error);
			}
		}
	});
	document.querySelector("#update-email").addEventListener("click", () => {
		console.log("emmaaaa");
		if (ValidateEmail(newEmailInput)) {
			const newemail = document.querySelector("#email-input").value;
			try {
				updateUserData({ value: newemail, fieldToUpdate: "email" });
			} catch (error) {
				console.log(error);
			}
		}
	});
	newPassword.addEventListener("input", () => {
		ValidatePassword(newPassword, "old-password-error");
	});
	document.querySelector("#update-password").addEventListener("click", () => {
		if (ValidatePassword(newPassword, "new-password-error")) {
			try {
				updateUserData({
					value: {
						newPassword: newPassword.value,
						oldPassword: oldPassword.value,
					},
					fieldToUpdate: "password",
				});
			} catch (error) {
				console.log(error);
			}
		}
	});
	document
		.querySelector(".checkbox-container")
		.addEventListener("click", ShowOrHidePassword);
}
async function getPurchases() {
	const userData = parseJwt();
	const userId = userData.userId;
	const url = `${baseServerUrl()}/art/purchases/${userId}`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			console.error(`HTTP Error status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return error;
	}
}
function updateView(component, hash) {
	if (hash) {
		window.location.hash = hash;
	}
	main.innerHTML = "";
	main.appendChild(component);
}

function removeSearchParams(url) {
	const urlObj = new URL(url);

	return urlObj.hash.split("?")[0];
}

function scrollToBottom(elementIdentifier) {
	const element = document.querySelector(elementIdentifier);

	if (element) {
		element.scrollTop = element.scrollHeight;
	} else {
		console.error(`Element with id '${elementIdentifier}' not found.`);
	}
}

async function updateUserData(data) {
	// Get userId
	const userData = parseJwt();
	const userId = userData.userId;
	const url = `${baseServerUrl()}/user/edit/${userId}`;

	try {
		const response = await fetch(url, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			console.error(`HTTP Error status: ${response.status}`);
		}
		addNotification("Update Successful", true);
		console.log(response);
		return await response.json();
	} catch (error) {
		addNotification("Sorry the update Failed", false);
		throw error;
	}
}

function logout() {
	console.log("Cleared");
	localStorage.clear();
	window.open("../index.html", "_self");
}

function artCard(data) {
	const card = document.createElement("div");
	card.innerHTML = `<div class="image">
			<img src=${data.url} alt=${data.title} />
		</div>
		<span class="title">${data.title}</span>
		<span class="price">N ${data.cost}</span>`;
	return card;
}
function ShowOrHidePassword() {
	const userPasswordEls = document.querySelectorAll(".password-input");

	userPasswordEls.forEach((el) => {
		console.log(el.type);
		if (el.type === "password") {
			el.type = "text";
		} else {
			el.type = "password";
		}
	});
}

function ValidateName(username) {
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
function ValidateEmail(userEmail) {
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
function ValidatePassword(userPassword, errorElementId) {
	const errorElement = document.querySelector(`#${errorElementId}`);
	// Validate lowercase letters
	let lowerCaseLetters = /[a-z]/g;
	if (!userPassword.value.match(lowerCaseLetters)) {
		errorElement.classList.remove("hide");
		errorElement.classList.add("show");
		return false;
	}
	// Validate Special Characters letters
	let SpecialCharacters =
		/[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
	// console.log(userPassword.value.match(SpecialCharacters));
	if (!userPassword.value.match(SpecialCharacters)) {
		errorElement.classList.remove("hide");
		errorElement.classList.add("show");
		return false;
	}

	// Validate capital letters
	let upperCaseLetters = /[A-Z]/g;
	if (!userPassword.value.match(upperCaseLetters)) {
		errorElement.classList.remove("hide");
		errorElement.classList.add("show");
		return false;
	}

	// Validate numbers
	let numbers = /[0-9]/g;
	if (!userPassword.value.match(numbers)) {
		errorElement.classList.remove("hide");
		errorElement.classList.add("show");
		return false;
	}

	// Validate length
	if (!userPassword.value.length >= 8) {
		errorElement.classList.remove("hide");
		errorElement.classList.add("show");
		return false;
	}
	errorElement.classList.remove("show");
	errorElement.classList.add("hide");
	return true;
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
	NotiElement.style.backgroundColor = success ? "green" : "red";
	NotiElement.style.left = "50%";
	NotiElement.style.top = "0";
	NotiElement.style.transform = "translate(-50%, 50%)";

	NotiElement.innerHTML = ` <span>${message}.</span><div id='closeBtn'>X</div>`;
	document.body.appendChild(NotiElement);
	//keep it always at the bottom corner of the window
	document.addEventListener("scroll", (event) => {
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
