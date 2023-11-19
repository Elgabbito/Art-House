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
	const categoryArt = await getArtCategory();
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

	// Get user data from token
	const tokenData = parseJwt();

	if (!tokenData) {
		navBtns.innerHTML = "";
		navBtns.innerHTML = loginSignupBtns;
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
	if (token && role !== "artist") {
		window.open("./pages/commisionart.html", "_self");
		return;
	}
	if (token && role === "artist") {
		window.open("./pages/postArt.html", "_self");
		return;
	}
	window.open("./pages/login.html", "_self");
}
async function getTopArt() {
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
async function getArtCategory() {
	const url = "http://localhost:3000/art/categories";
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
		const card = createCard(data[i].url, data[i].name, data[i].cost);
		card.addEventListener("click", () => {
			window.open(`./pages/product.html#${data[i].name.split(" ").join("-")}`);
		});
		carousel.appendChild(card);
	}
	console.log(carousel);
}
const createCard = (src, name) => {
	const card = document.createElement("div");
	card.classList.add("card");
	card.innerHTML = `<div class="image">
                        <img id="card-img" src=${src} alt=${name} />
                    </div>
                    <span class="title">${name}</span>`;
	return card;
};
