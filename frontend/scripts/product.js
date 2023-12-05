const title = document.querySelector(".title");
const navBtns = document.querySelector(".nav-btns");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const description = document.querySelector(".description");
const commisionBtn = document.querySelector("#commision-btn");
const imageContainer = document.querySelector("#image-container");

// Event Listeners
// Check if the user is logged in
window.addEventListener("load", async () => {
	const tokenData = parseJwt();
	const userrole = localStorage.getItem("role");
	const firstBtn = userrole == "artist" ? "Post Art" : "Commision Art";
	const profileBtns = `  <div class="profileimage">
          <a id="profile-btn" href=${
						userrole == "artist"
							? "./pages/artistDashboard.html"
							: "./pages/userDashboard.html"
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

	const { details, bids } = await getSingleArt();
	const image = document.createElement("img");
	image.src = details.url;
	image.setAttribute("style", "width:80%; border-radius:10px;");
	imageContainer.appendChild(image);
	title.innerText = details.name;
	description.innerText = details.description;
	commisionBtn.innerText = firstBtn;

	// Get user data from token

	if (!tokenData) {
		navBtns.innerHTML = "";
		navBtns.innerHTML = loginSignupBtns;
		navBtns.style.marginLeft = "0";
	}
	console.log(tokenData);

	if (tokenData) {
		const tokenExpiry = new Date(tokenData.exp * 1000);
		navBtns.innerHTML = "";
		navBtns.innerHTML = profileBtns;

		if (new Date() >= tokenExpiry) {
			window.open("./pages/login.html", "_self");
		}
	}
});

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
async function getSingleArt() {
	// Instantiate URL search params object with current URL
	const params = new URLSearchParams(window.location.search);

	// Get art param from URL object and convert it to a string
	const name = params.get("art").toString();
	const id = params.get("id").toString();

	try {
		const response = await fetch(
			`http://localhost:4000/art/singleArt?id=${id}`
		);
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		return error;
	}
}
function removeAdditionSymbol(inputString) {
	// Use a regular expression to find consecutive ampersands
	const regex = /\+/g;

	// Replace consecutive ampersands with a single ampersand
	const resultString = inputString.replace(regex, " ");

	return resultString;
}
