const main = document.querySelector(".profile-info");
const body = document.querySelector("body");
const username = document.querySelector("#username");
const analyticsScriptTag = document.querySelector("#analytics-js");
const manageusersBtn = document.querySelector("#manage-users");
const editProfileBtn = document.querySelector("#edit-profile");
const createAdminBtn = document.querySelector("#my-art");
const statsBtn = document.querySelector("#stats");
const logoutBtn = document.querySelector("#logout-btn");
const settingsBtn = document.querySelector("#settings");

// Get and set username from local storage
const storedname = localStorage.getItem("username") ?? "User";
username.innerText = `Hi, ${storedname}`;

// Components
const xValues = [
	getDate(13),
	getDate(12),
	getDate(11),
	getDate(10),
	getDate(9),
	getDate(8),
	getDate(7),
	getDate(6),
	getDate(5),
	getDate(4),
	getDate(3),
	getDate(2),
	getDate(1),
	getDate(0),
];
const yValues = [
	200, 325, 320, 413, 265, 604, 587, 549, 674, 680, 660, 709, 713, 785,
];

new Chart("myChart", {
	type: "bar",
	data: {
		labels: xValues,
		datasets: [
			{
				fill: false,
				lineTension: 0,
				backgroundColor: "#302c1b",
				borderColor: "rgba(0,0,255,0.1)",
				data: yValues,
			},
		],
	},
	options: {
		legend: { display: false },
		title: {
			display: true,
			text: "Daily Active Users (Last 14 days)",
		},
		scales: {
			yAxes: [{ ticks: { min: 6, max: 1000 } }],
		},
	},
});

// Event listeners
editProfileBtn.addEventListener("click", () => {
	updateView("#edit-profile-body");
});
createAdminBtn.addEventListener("click", () => {
	updateView("#create-admin-body");
});
statsBtn.addEventListener("click", () => {
	updateView("#user-analytics-body");
});
manageusersBtn.addEventListener("click", async () => {
	// const users = await getUsers();
	updateView("#manage-users-body");
});
settingsBtn.addEventListener("click", () => {
	updateView("#settings-body");
});
logoutBtn.addEventListener("click", () => {
	logout();
});
const users = await getUsers();
console.log(users);
let usernumber = 1;
users.data.forEach((user) => {
	const usercard = document.createElement("div");
	usercard.className = "user-card";
	usercard.innerHTML = `
	<div>${usernumber++}</div><div>${user.name}</div><div>${user.email}</div><div>${
		user.user_role
	}</div>`;
	document.querySelector(".users-list").appendChild(usercard);
});

// Function Declararions
function getDate(num) {
	const date = new Date().getDate() - num;
	const suffix =
		new Date().getDate() - num == 3
			? "rd"
			: new Date().getDate() - num == 2
			? "nd"
			: new Date().getDate() - num == 1
			? "st"
			: "th";
	return date + suffix;
}

function updateView(componentId) {
	const component = document.querySelector(`${componentId}`);
	const sections = document.querySelectorAll(".profile-info");

	// Hide old section
	sections.forEach((el) => {
		if (el.classList.contains("show")) {
			el.classList.remove("show");
			el.classList.add("hide");
		}
	});

	if (component.classList.contains("hide")) {
		component.classList.remove("hide");
		component.classList.add("show");
	} else {
		component.classList.remove("show");
		component.classList.add("hide");
	}
}

async function getUsers() {
	const url = `${baseServerUrl}/user/`;
	try {
		const result = await fetch(url);
		if (!result.ok) {
			throw new Error("Network response was not ok");
		}
		return await result.json();
	} catch (error) {
		console.log(error);
	}
}

async function createAdmin(data) {
	const url = `${baseServerUrl}/auth/signup`;
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
function logout() {
	localStorage.clear();
	window.open("../index.html", "_self");
}
