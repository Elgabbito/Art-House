const route = document.getElementById("route");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const navBtns = document.querySelector(".nav-btns");
const commisionBtn = document.querySelector("#commision-btn");
const topArtCarousel = document.querySelector("#top-art");
const categoriesCarousel = document.querySelector("#categories");
const cards = document.querySelectorAll(".card");
const basePath = "./index.html";

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
	const loginSignupBtns = `<button class="nav-btn" id="login-btn" onclick="goToLogin()">Login</button>
        <button class="nav-btn" id="signup-btn" onclick="goToSignup()">Sign up</button>`;

	commisionBtn.innerText = firstBtn;
	// commisionBtn.addEventListener("click");

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
			window.open("./pages/login.html", "_self");
		}
	}

	// Append art to DOM
	createCarousel(art.data, topArtCarousel);
	// createCarousel(categoryArt.data, categoriesCarousel);
});

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
async function getTopArt() {
	const url = "http://localhost:4000/art/";
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
async function getArtCategory() {
	const url = "http://localhost:4000/art/categories";
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
