const route = document.getElementById("route");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const navBtns = document.querySelector(".nav-btns");
const commisionBtn = document.querySelector("#commision-btn");
const cards = document.querySelectorAll(".card");
const basePath = "./index.html";

// Route to login page
loginBtn.addEventListener("click", () => {
  goToLogin();
});
// Route to signup page
signupBtn.addEventListener("click", () => {
  goToSignup();
});
// Check if the user is logged in
window.addEventListener("load", () => {
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
    return;
  }
  // console.log(tokenData);
  const tokenExpiry = new Date(tokenData.exp * 1000);

  if (tokenData) {
    navBtns.innerHTML = "";
    navBtns.innerHTML = profileBtns;
    return;
  }
  if (new Date() <= tokenExpiry) {
    window.open("./pages/login.html", "_self");
  }
});
commisionBtn.addEventListener("click", commisionArtRouting);

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
function commisionArtRouting() {
  const token = localStorage.getItem("token");
  if (token) {
    window.open("./pages/commisionart.html", "_self");
    return;
  }
  window.open("./pages/login.html", "_self");
}
