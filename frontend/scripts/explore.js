const commisionBtn = document.querySelector("#commision-btn");
const navBtns = document.querySelector(".nav-btns");
const artDisplay = document.querySelector(".art-display");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const searchBar = document.querySelector("#search-by-name");
const searchBarBtn = document.querySelector(".search-icon");
const minCost = document.querySelector("#min-cost");
const maxCost = document.querySelector("#max-cost");
const costControl = document.querySelectorAll(".cost-control");
const inputField = document.querySelector(".chosen-value");
const filterBtn = document.querySelector("#submit");
const clearBtn = document.querySelector("#clear");
const dropdown = document.querySelector(".value-list");
const dropdownArray = document.querySelectorAll("li");
const categories = document.querySelectorAll(".checkbox-input");
const urlParams = new URLSearchParams(window.location.search);
const valueArray = [];
import { baseServerUrl } from "../baseServerUrl.mjs";

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
	art.forEach((data) => artDisplay.appendChild(createArtCard(data)));
	searchBar.value = urlParams.get("name");

	// Set min cost on slider from URL if it is set
	if (urlParams.get("min")) newRangeSlider.setMinValue(urlParams.get("min"));
	// Set max cost on slider from URL if it is set
	if (urlParams.get("max")) newRangeSlider.setMaxValue(urlParams.get("max"));

	// Set value is min cost in text from URL if it is set
	if (urlParams.get("min")) {
		document.getElementById("min-result").innerHTML =
			"Min: ₦" + urlParams.get("min");
	}
	// Set value is max cost in text from URL if it is set
	if (urlParams.get("min")) {
		document.getElementById("max-result").innerHTML =
			" Max: ₦" + urlParams.get("max");
	}
	if (urlParams.get("location")) inputField.value = urlParams.get("location");

	// const selectedCategories = urlParams.getAll("category");
	// console.log("selected:", selectedCategories);
	// selectedCategories.forEach((item) =>
	// 	categories.forEach((el) => {
	// 		console.log("El Val:", el.value);
	// 		if (el.value === item) {
	// 			el.nextElementSibling.style.backgroundColor = "#5ee429";
	// 			el.nextElementSibling.style.border = "solid white";
	// 			el.nextElementSibling.style.borderWidth = "0 0.15em 0.15em 0";
	// 			console.log(el.nextElementSibling);
	// 		} else {
	// 			el.nextElementSibling.style.backgroundColor = "white";
	// 		}
	// 	})
	// );
});

// Route to login page
loginBtn.addEventListener("click", () => {
	goToLogin();
});
// Route to signup page
signupBtn.addEventListener("click", () => {
	goToSignup();
});
// Search by filter
filterBtn.addEventListener("click", async () => {
	const art = await getFilteredArt();
	console.log(art);

	artDisplay.innerHTML = "";
	art.forEach((data) => artDisplay.appendChild(createArtCard(data)));
});
// Search by filter on load
window.addEventListener("load", async () => {
	if (!urlParams.toString()) {
		return;
	}
	const art = await getFilteredArt();

	if (art === "Empty") {
		artDisplay.innerHTML = `<div class="no-art">Sorry No art works fit your search</div>`;
		console.log("empty");
		return;
	}

	artDisplay.innerHTML = "";
	art.forEach((data) => artDisplay.appendChild(createArtCard(data)));
});
// Search for art by name
searchBar.addEventListener("blur", () => {
	searchBar.placeholder = searchBar.value;
	addURLParam("name", searchBar.value, true);
});
clearBtn.addEventListener("click", clearFilters);
// Update min and max cost
costControl.forEach((el) => {
	el.addEventListener("click", () => {
		if (el.classList.contains("number-right") && el.classList.contains("max")) {
			Number(maxCost.value) + 1;
			console.log(Number(maxCost.value) + 1);
		}
	});
});
// Update URL with selected categories
categories.forEach((el) => {
	el.addEventListener("click", () => {
		console.log(urlParams.getAll("category").includes(el.value));

		if (urlParams.getAll("category").includes(el.value)) {
			removeSearchParam("category", el.value);
		} else {
			addURLParam("category", el.value, false);
		}
	});
});
// Create Art Card
function createArtCard(data) {
	const card = document.createElement("div");
	const { name, id, url, cost } = data;

	card.addEventListener("click", () => {
		window.open(
			`${window.location.origin}/pages/product.html?art=${name}&id=${id}`,
			"_self"
		);
	});
	card.className = "art-card";
	card.innerHTML = `<div class="card-img-container"><img class="card-img" src="${url}" alt="${name}"></div>
                    <div class="card-text">
                        <h5 class="card-title">${name}</h5>
                        <p class="cost">N${cost}</p>
                    </div>`;
	return card;
}
async function getArt() {
	const url = `${baseServerUrl()}/art/`;
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
console.log(urlParams.toString());

async function getFilteredArt() {
	console.log(window.location.search);
	const url = `${baseServerUrl()}/art/filteredArt?${urlParams.toString()}`;
	console.log(urlParams.toString());
	try {
		const response = await fetch(url);
		const data = await response.json();

		if (JSON.stringify(data).length > 2) {
			return data;
		}
		return "Empty";
	} catch (error) {
		console.log(error);
		return error;
	}
}

// Cost Slider Code Start
var ZBRangeSlider = function (id) {
	var self = this;
	var startX = 0,
		x = 0;

	// retrieve touch button
	var slider = document.getElementById(id);
	var touchLeft = slider.querySelector(".slider-touch-left");
	var touchRight = slider.querySelector(".slider-touch-right");
	var lineSpan = slider.querySelector(".slider-line span");

	// get some properties
	var min = parseFloat(slider.getAttribute("se-min"));
	var max = parseFloat(slider.getAttribute("se-max"));

	// retrieve default values
	var defaultMinValue = min;
	if (slider.hasAttribute("se-min-value")) {
		defaultMinValue = parseFloat(slider.getAttribute("se-min-value"));
	}
	var defaultMaxValue = max;

	if (slider.hasAttribute("se-max-value")) {
		defaultMaxValue = parseFloat(slider.getAttribute("se-max-value"));
	}

	// check values are correct
	if (defaultMinValue < min) {
		defaultMinValue = min;
	}

	if (defaultMaxValue > max) {
		defaultMaxValue = max;
	}

	if (defaultMinValue > defaultMaxValue) {
		defaultMinValue = defaultMaxValue;
	}

	var step = 0.0;

	if (slider.getAttribute("se-step")) {
		step = Math.abs(parseFloat(slider.getAttribute("se-step")));
	}

	// normalize flag
	var normalizeFact = 26;

	self.slider = slider;
	self.reset = function () {
		touchLeft.style.left = "0px";
		touchRight.style.left = slider.offsetWidth - touchLeft.offsetWidth + "px";
		lineSpan.style.marginLeft = "0px";
		lineSpan.style.width = slider.offsetWidth - touchLeft.offsetWidth + "px";
		startX = 0;
		x = 0;
	};

	self.setMinValue = function (minValue) {
		var ratio = (minValue - min) / (max - min);
		touchLeft.style.left =
			Math.ceil(
				ratio * (slider.offsetWidth - (touchLeft.offsetWidth + normalizeFact))
			) + "px";
		lineSpan.style.marginLeft = touchLeft.offsetLeft + "px";
		lineSpan.style.width = touchRight.offsetLeft - touchLeft.offsetLeft + "px";
		slider.setAttribute("se-min-value", minValue);
	};

	self.setMaxValue = function (maxValue) {
		var ratio = (maxValue - min) / (max - min);
		touchRight.style.left =
			Math.ceil(
				ratio * (slider.offsetWidth - (touchLeft.offsetWidth + normalizeFact)) +
					normalizeFact
			) + "px";
		lineSpan.style.marginLeft = touchLeft.offsetLeft + "px";
		lineSpan.style.width = touchRight.offsetLeft - touchLeft.offsetLeft + "px";
		slider.setAttribute("se-max-value", maxValue);
	};

	// initial reset
	self.reset();

	// usefull values, min, max, normalize fact is the width of both touch buttons
	var maxX = slider.offsetWidth - touchRight.offsetWidth;
	var selectedTouch = null;
	var initialValue = lineSpan.offsetWidth - normalizeFact;

	// set defualt values
	self.setMinValue(defaultMinValue);
	self.setMaxValue(defaultMaxValue);

	// setup touch/click events
	function onStart(event) {
		// Prevent default dragging of selected content
		event.preventDefault();
		var eventTouch = event;

		if (event.touches) {
			eventTouch = event.touches[0];
		}

		if (this === touchLeft) {
			x = touchLeft.offsetLeft;
		} else {
			x = touchRight.offsetLeft;
		}

		startX = eventTouch.pageX - x;
		selectedTouch = this;
		document.addEventListener("mousemove", onMove);
		document.addEventListener("mouseup", onStop);
		document.addEventListener("touchmove", onMove);
		document.addEventListener("touchend", onStop);
	}

	function onMove(event) {
		var eventTouch = event;

		if (event.touches) {
			eventTouch = event.touches[0];
		}

		x = eventTouch.pageX - startX;

		if (selectedTouch === touchLeft) {
			if (x > touchRight.offsetLeft - selectedTouch.offsetWidth + 10) {
				x = touchRight.offsetLeft - selectedTouch.offsetWidth + 10;
			} else if (x < 0) {
				x = 0;
			}

			selectedTouch.style.left = x + "px";
		} else if (selectedTouch === touchRight) {
			if (x < touchLeft.offsetLeft + touchLeft.offsetWidth - 10) {
				x = touchLeft.offsetLeft + touchLeft.offsetWidth - 10;
			} else if (x > maxX) {
				x = maxX;
			}
			selectedTouch.style.left = x + "px";
		}

		// update line span
		lineSpan.style.marginLeft = touchLeft.offsetLeft + "px";
		lineSpan.style.width = touchRight.offsetLeft - touchLeft.offsetLeft + "px";

		// write new value
		calculateValue();

		// call on change
		if (slider.getAttribute("on-change")) {
			var fn = new Function("min, max", slider.getAttribute("on-change"));
			fn(
				slider.getAttribute("se-min-value"),
				slider.getAttribute("se-max-value")
			);
		}

		if (self.onChange) {
			self.onChange(
				slider.getAttribute("se-min-value"),
				slider.getAttribute("se-max-value")
			);
		}
	}

	function onStop(event) {
		document.removeEventListener("mousemove", onMove);
		document.removeEventListener("mouseup", onStop);
		document.removeEventListener("touchmove", onMove);
		document.removeEventListener("touchend", onStop);

		selectedTouch = null;

		// write new value
		calculateValue();

		// call did changed
		if (slider.getAttribute("did-changed")) {
			var fn = new Function("min, max", slider.getAttribute("did-changed"));
			fn(
				slider.getAttribute("se-min-value"),
				slider.getAttribute("se-max-value")
			);
		}

		if (self.didChanged) {
			self.didChanged(
				slider.getAttribute("se-min-value"),
				slider.getAttribute("se-max-value")
			);
		}
	}

	function calculateValue() {
		var newValue = (lineSpan.offsetWidth - normalizeFact) / initialValue;
		var minValue = lineSpan.offsetLeft / initialValue;
		var maxValue = minValue + newValue;

		var minValue = minValue * (max - min) + min;
		var maxValue = maxValue * (max - min) + min;

		console.log(step);
		if (step !== 0.0) {
			var multi = Math.floor(minValue / step);
			minValue = step * multi;

			multi = Math.floor(maxValue / step);
			maxValue = step * multi;
		}

		slider.setAttribute("se-min-value", minValue);
		slider.setAttribute("se-max-value", maxValue);
	}

	// link events
	touchLeft.addEventListener("mousedown", onStart);
	touchRight.addEventListener("mousedown", onStart);
	touchLeft.addEventListener("touchstart", onStart);
	touchRight.addEventListener("touchstart", onStart);
};

// -------------------
// How to use?
var newRangeSlider = new ZBRangeSlider("my-slider");

newRangeSlider.onChange = function (min, max) {
	console.log(min, max);

	let maxAsString =
		max.toString().length > 3
			? insertAtIndex(max.toString(), ",", max.toString().length - 3)
			: max;

	let minAsString =
		min.toString().length > 3
			? insertAtIndex(min.toString(), ",", min.toString().length - 3)
			: min;

	document.getElementById("min-result").innerHTML = "Min: ₦" + minAsString;
	document.getElementById("max-result").innerHTML = " Max: ₦" + maxAsString;
};

newRangeSlider.didChanged = function (min, max) {
	console.log(min, max, this);
	let maxAsString =
		max.toString().length > 3
			? insertAtIndex(max.toString(), ",", max.toString().length - 3)
			: max;

	let minAsString =
		min.toString().length > 3
			? insertAtIndex(min.toString(), ",", min.toString().length - 3)
			: min;

	document.getElementById("min-result").innerHTML = "Min: ₦" + minAsString;
	document.getElementById("max-result").innerHTML = " Max: ₦" + maxAsString;
	addURLParam("min", min, true);
	addURLParam("max", max, true);
};
// Cost Slider Code End

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
	item.addEventListener("pointerdown", (evt) => {
		inputField.value = item.textContent;

		addURLParam("location", item.textContent, true);

		dropdownArray.forEach((dropdown) => {
			dropdown.classList.add("closed");
		});
	});
});

inputField.addEventListener("focus", () => {
	inputField.placeholder = "Type to search";
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
// Dropdown Code End //

// Function Declarations
function insertAtIndex(str, substring, index) {
	return str.slice(0, index) + substring + str.slice(index);
}
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
function addURLParam(key, value, replace) {
	if (replace) {
		// Add the query key-value pair to the url params
		urlParams.set(key, value);
	} else {
		// Add the query key-value pair to the url params
		// without replacing the existing key-value pair
		urlParams.append(key, value);
	}

	// Create a new URL
	const newUrl = `${window.location.origin}${
		window.location.pathname
	}?${urlParams.toString()}`;

	// Replace the old URL
	window.history.replaceState({}, "", newUrl);
}
function removeSearchParam(oldKey, oldValue) {
	let searchParams = urlParams;
	let newSearchParams;
	for (const [key, value] of searchParams) {
		const paramKey = `${key}=${value}`;

		if (paramKey === `${oldKey}=${oldValue}`) {
			// Remove duplicate parameter
			newSearchParams = searchParams.toString().replace(paramKey, "");
		}
	}
	// Create a new URL
	const newUrl = removeDoubleAmpersand(
		`${window.location.origin}${
			window.location.pathname
		}?${newSearchParams.toString()}`
	);

	// Replace the old URL
	window.history.replaceState({}, "", newUrl);
	window.location.reload();
}
function removeDoubleAmpersand(inputString) {
	// Use a regular expression to find consecutive ampersands
	const regex = /&&/g;

	// Replace consecutive ampersands with a single ampersand
	const resultString = inputString.replace(regex, "&");

	return resultString;
}
function clearFilters() {
	// Create a new URL
	const newUrl = `${window.location.origin}${window.location.pathname}`;

	// Replace the old URL
	window.history.replaceState({}, "", newUrl);
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
