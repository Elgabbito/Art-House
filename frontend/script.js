const route = document.getElementById("route");
const signupBtn = document.createElement("button");
const loginBtn = document.createElement("button");
const navBtns = document.querySelector(".nav-btns");
const commisionBtn = document.querySelector("#commision-btn");
const topArtCarousel = document.querySelector("#top-art");
const categoryCards = document.querySelectorAll(".category");
const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".side-nav");
const navbar = document.querySelector(".nav");
const root = document.querySelector(":root");

const cards = document.querySelectorAll(".card");
const basePath = "./index.html";
import { baseServerUrl } from "./baseServerUrl.mjs";
import { parseJwt } from "./scripts/utils.js";

// Event Listeners
// Check if the user is logged in
window.addEventListener("load", async () => {
	const userrole = localStorage.getItem("role");
	const firstBtn = userrole == "artist" ? "Post Art" : "Commision Art";
	const art = await getTopArt();
	// const categoryArt = await getArtCategory();
	const profileBtns = `  <div class="profileimage">
          <a id="profile-btn" href=${
						userrole == "artist"
							? "./pages/artistDashboard.html"
							: "./pages/userDashboard.html"
					}>
            <img
              id="profileimg"
              src="./images/profile-fallback.svg"
              alt="Profile Picture"
            />
          </a>
        </div>`;

	loginBtn.onclick = goToLogin;
	loginBtn.className = "nav-btn";
	loginBtn.innerText = "Login";
	loginBtn.id = "login-btn";

	signupBtn.addEventListener("click", goToSignup);
	signupBtn.className = "nav-btn";
	signupBtn.innerText = "Sign Up";
	signupBtn.id = "signup-btn";

	commisionBtn.innerText = firstBtn;
	// commisionBtn.addEventListener("click");

	// Get user data from token
	const tokenData = parseJwt();

	if (!tokenData) {
		navBtns.innerHTML = "";
		navBtns.appendChild(loginBtn);
		navBtns.appendChild(signupBtn);
		navBtns.style.marginLeft = "0";
	}
	// console.log(tokenData);

	if (tokenData) {
		const tokenExpiry = new Date(tokenData.exp * 1000);
		navBtns.innerHTML = "";
		navBtns.innerHTML = profileBtns;

		if (new Date() >= tokenExpiry) {
			window.open("./pages/login.html", "_self");
		}
	}

	// Append art to DOM
	createCarousel(art.data, topArtCarousel);
	// createCarousel(categoryArt.data, categoriesCarousel);
});
hamburger.addEventListener("click", () => {
	hamburger.classList.toggle("active");
	navList.classList.toggle("active");
	document.body.classList.toggle("no-scroll");
});

document.querySelectorAll(".nav-link-container").forEach((element) =>
	element.addEventListener("click", () => {
		hamburger.classList.remove("active");
		navList.classList.remove("active");
	})
);

// Route to login page
loginBtn.addEventListener("click", () => {
	goToLogin();
});
// Route to signup page
signupBtn.addEventListener("click", () => {
	goToSignup();
});
// Set where commision art btn takes you
commisionBtn.addEventListener("click", () =>
	commisionArtRouting(localStorage.getItem("role"))
);

// Function Declarations
function goToLogin() {
	window.open("./pages/login.html", "_self");
}
function goToSignup() {
	window.open("./pages/signup.html", "_self");
}
function commisionArtRouting(role) {
	const token = localStorage.getItem("token");
	if (!token) {
		addNotification("Sign up or Login to Commision Art", "neutral");
		return;
	}
	if (token && role !== "artist") {
		window.open("./pages/commisionart.html", "_self");
	} else if (token && role === "artist") {
		window.open("./pages/postArt.html", "_self");
	}
}
// Add event listener to each category card
categoryCards.forEach((card) => {
	card.addEventListener("click", () => {
		if (card.id === "photo-category") {
			window.open("./pages/explore.html?category=photograph", "_self");
			return;
		}
		if (card.id === "sculpture-category") {
			window.open("./pages/explore.html?category=sculpture", "_self");
			return;
		}
		if (card.id === "painting-category") {
			window.open("./pages/explore.html?category=painting", "_self");
			return;
		}
		if (card.id === "drawing-category") {
			window.open("./pages/explore.html?category=drawing", "_self");
			return;
		}
	});
});
async function getTopArt() {
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
// async function getArtCategory() {
// 	const url = "http://localhost:4000/art/categories";
// 	try {
// 		const response = await fetch(url);
// 		const data = await response.json();
// 		console.log(data);
// 		return data;
// 	} catch (error) {
// 		console.log(error);
// 		return error;
// 	}
// }
function createCarousel(data, carousel) {
	carousel.innerHTML = "";
	for (let i = 0; i < data.length; i++) {
		const card = createCard(data[i].url, data[i].name, data[i].id);
		card.addEventListener("click", () => {
			window.open(`./pages/product.html#${data[i].name.split(" ").join("-")}`);
		});
		carousel.appendChild(card);
	}
	console.log(carousel);
}
const createCard = (src, name, id) => {
	const card = document.createElement("div");
	card.classList.add("card");
	card.id = name;
	card.addEventListener("click", () => {
		window.open(`./pages/product.html?art=${name}&id=${id}`, "_self");
	});
	card.innerHTML = `<div class="image">
                        <img id="card-img" src=${src} alt=${name} />
                    </div>
                    <span class="title">${name}</span>`;
	return card;
};
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
	NotiElement.style.backgroundColor =
		type === "good" ? "rgb(26, 255, 60)" : type === "bad" ? "red" : "#1F88D9";
	NotiElement.style.color =
		type === "good" ? "#302c1b" : type === "bad" ? "#fae6c7" : "#fae6c7";
	NotiElement.style.left = "50%";
	NotiElement.style.top = "0";
	NotiElement.style.transform = "translate(-50%, 50%)";

	NotiElement.innerHTML = ` <span>${message}.</span><div id='closeBtn'>X</div>`;
	document.body.appendChild(NotiElement);

	// Remove popup
	// By timer
	setTimeout(() => document.body.removeChild(NotiElement), 5000);
	// By button click
	document.getElementById("closeBtn").addEventListener("click", () => {
		document.body.removeChild(NotiElement);
	});
}
function setNavbarHeight() {
	let height = navbar.offsetHeight + "px";
	root.style.setProperty("--navbarHeight", height);
	console.log(height);
}
