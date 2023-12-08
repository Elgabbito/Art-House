const bidsEl = document.querySelector(".bids");
const title = document.querySelector(".title");
const timer = document.querySelector(".timer");
const navBtns = document.querySelector(".nav-btns");
const buyNowBtn = document.getElementById("buy-now");
const setBidBtn = document.querySelector("#set-bid");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const description = document.querySelector(".description");
const rightDetail = document.querySelector(".right-detail");
const commisionBtn = document.querySelector("#commision-btn");
const purchaseTitle = document.querySelector("#purchase-title");
const imageContainer = document.querySelector("#image-container");
const purchaseDetails = document.querySelector(".purchase-details");
const bidsCommentsTitle = document.querySelector("#bids-comments-title");

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
	bids.forEach(({ name, amount, created_at }) => {
		const newBid = bidElement(name, amount, created_at);
		bidsEl.appendChild(newBid);
	});

	if (details.purchase_type === "bid") {
		purchaseTitle.innerText = "Auction ends in:";
		timer.style.display = "flex";
		setBidBtn.innerText = "Set a bid";
		rightDetail.style.display = "none";
	}
	if (details.purchase_type !== "bid") {
		bidsEl.style.display = "none";
		purchaseDetails.style.display = "none";
		rightDetail.setAttribute("style", "display:flex");
	}

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

buyNowBtn.addEventListener("submit", payWithPaystack, false);

// Function Declarations
function payWithPaystack(e) {
	e.preventDefault();
	let handler = PaystackPop.setup({
		key: "pk_test_dc0a29ca96f1797f5db721e2b2d55babe3fba9b4", // Replace with your public key
		email: "msmaudu@gmail.com",
		amount: 10 * 100,
		ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
		// label: "Optional string that replaces customer email"
		onClose: function () {
			alert("Window closed.");
		},
		callback: function (response) {
			let message = "Payment complete! Reference: " + response.reference;
			alert(message);
		},
	});

	handler.openIframe();
}
function goToLogin() {
	window.open("../pages/login.html", "_self");
}
function goToSignup() {
	window.open("../pages/signup.html", "_self");
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
async function getSingleArt() {
	// Instantiate URL search params object with current URL
	const params = new URLSearchParams(window.location.search);

	// Get art param from URL object and convert it to a string
	// const name = params.get("art").toString();
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
function bidElement(name, amount, created_at) {
	const day = new Date(created_at).toLocaleDateString();
	const time = new Date(created_at).toLocaleTimeString();
	const bid = document.createElement("li");
	bid.className = "bid";
	bid.innerHTML = `<div class="bid-icon"><img src="../images/bid-svg.svg" alt=""></div>
          		<div class="bid-content">
            		<span class="bid-text">${name} set a bid of </span><span class="bid-amount">&nbsp;N${amount}&nbsp;</span>
					<span class="bid-text"> at ${time} ${day}</span>
				</div>`;
	return bid;
}
console.log(name);
