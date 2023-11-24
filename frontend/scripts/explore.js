const commisionBtn = document.querySelector("#commision-btn");
const navBtns = document.querySelector(".nav-btns");
const artDisplay = document.querySelector(".art-display");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const inputField = document.querySelector(".chosen-value");
const dropdown = document.querySelector(".value-list");
const dropdownArray = [...document.querySelectorAll("li")];
let valueArray = [];

// Check if the useris logged in
window.addEventListener("load", async () => {
	const { data: art } = await getArt();
	const userrole = localStorage.getItem("role");
	const firstBtn = userrole == "artist" ? "Post Art" : "Commision Art";
	const profileBtns = `  <div class="profileimage">
          <a id="profile-btn" href=${
						userrole == "artist"
							? "../pages/artistDashboard.html"
							: "../pages/userDashboard.html"
					}>
            <img
              id="profileimg"
              src="../images/profile-fallback.svg"
              alt="Profile Picture"
            />
          </a>
        </div>`;
	const loginSignupBtns = `<button class="nav-btn" id="login-btn" onclick="goToLogin()">Login</button>
        <button class="nav-btn" id="signup-btn" onclick="goToSignup()">Sign up</button>`;

	// Get user data from token
	const tokenData = parseJwt();

	if (!tokenData) {
		navBtns.innerHTML = "";
		navBtns.innerHTML = loginSignupBtns;
		navBtns.style.marginLeft = "0";
	}
	// console.log(tokenData);

	if (tokenData) {
		const tokenExpiry = new Date(tokenData.exp * 1000);
		navBtns.innerHTML = "";
		navBtns.innerHTML = profileBtns;

		if (new Date() >= tokenExpiry) {
			window.open("../pages/login.html", "_self");
		}
	}

	// Append Art to DOM
	art.forEach((item) =>
		artDisplay.appendChild(
			createArtCard(item.url, item.description, item.name, item.cost)
		)
	);
});

// Route to login page
loginBtn.addEventListener("click", () => {
	goToLogin();
});
// Route to signup page
signupBtn.addEventListener("click", () => {
	goToSignup();
});
// Create Art Card
function createArtCard(imgSrc, imgDescription, title, cost) {
	const card = document.createElement("div");
	card.className = "art-card";
	card.innerHTML = `<div class="card-img-container"><img class="card-img" src="${imgSrc}" alt="${imgDescription}"></div>
                    <div class="card-text">
                        <h5 class="card-title">${title}</h5>
                        <p class="cost">N${cost}</p>
                    </div>`;
	return card;
}
async function getArt() {
	const url = "http://localhost:3000/art/";
	try {
		const response = await fetch(url);
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
		return error;
	}
}

// Dropdown Code Start
dropdownArray.forEach((item) => {
	valueArray.push(item.textContent);
});

const closeDropdown = () => {
	dropdown.classList.remove("open");
};

inputField.addEventListener("input", () => {
	dropdown.classList.add("open");
	let inputValue = inputField.value.toLowerCase();
	let valueSubstring;
	if (inputValue.length > 0) {
		for (let j = 0; j < valueArray.length; j++) {
			if (
				!(
					inputValue.substring(0, inputValue.length) ===
					valueArray[j].substring(0, inputValue.length).toLowerCase()
				)
			) {
				dropdownArray[j].classList.add("closed");
			} else {
				dropdownArray[j].classList.remove("closed");
			}
		}
	} else {
		for (let i = 0; i < dropdownArray.length; i++) {
			dropdownArray[i].classList.remove("closed");
		}
	}
});

dropdownArray.forEach((item) => {
	item.addEventListener("click", (evt) => {
		inputField.value = item.textContent;
		dropdownArray.forEach((dropdown) => {
			dropdown.classList.add("closed");
		});
	});
});

inputField.addEventListener("focus", () => {
	inputField.placeholder = "Type to filter";
	dropdown.classList.add("open");
	dropdownArray.forEach((dropdown) => {
		dropdown.classList.remove("closed");
	});
});

inputField.addEventListener("blur", () => {
	inputField.placeholder = "Select Location";
	dropdown.classList.remove("open");
});

document.addEventListener("click", (evt) => {
	const isDropdown = dropdown.contains(evt.target);
	const isInput = inputField.contains(evt.target);
	if (!isDropdown && !isInput) {
		dropdown.classList.remove("open");
	}
});
// Dropdown Code End

// Function Declarations
function parseJwt() {
	const token = localStorage.getItem("token");
	if (!token) {
		return;
	}
	const base64Url = token.split(".")[1];
	const base64 = base64Url.replace("-", "+").replace("_", "/");
	return JSON.parse(window.atob(base64));
}
function goToLogin() {
	window.open("../pages/login.html", "_self");
}
function goToSignup() {
	window.open("../pages/signup.html", "_self");
}
function commisionArtRouting(role) {
	const token = localStorage.getItem("token");
	if (!token) {
		addNotification("Sign up or Login to Commision Art", "neutral");
		return;
	}
	if (token && role !== "artist") {
		window.open("../pages/commisionart.html", "_self");
	} else if (token && role === "artist") {
		window.open("../pages/postArt.html", "_self");
	}
}
function addNotification(message, type) {
	//create notification
	const NotiElement = document.createElement("div");
	NotiElement.id = "stickyNotification";
	NotiElement.style.display = "flex";
	NotiElement.style.gap = "1em";
	NotiElement.style.alignItems = "center";
	NotiElement.style.position = "absolute";
	NotiElement.style.width = "max-content";
	NotiElement.style.height = "max-content";
	NotiElement.style.padding = "10px";
	NotiElement.style.paddingLeft = "20px";
	NotiElement.style.paddingRight = "20px";
	NotiElement.style.borderRadius = "5px";
	NotiElement.style.border = "1px solid black";
	NotiElement.style.cursor = "pointer";
	NotiElement.style.backgroundColor =
		type === "good" ? "rgb(26, 255, 60)" : type === "bad" ? "red" : "#1F88D9";
	NotiElement.style.color =
		type === "good" ? "#302c1b" : type === "bad" ? "#fae6c7" : "#fae6c7";
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
