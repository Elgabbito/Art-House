const route = document.getElementById("route");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const navBtns = document.querySelector(".nav-btns");
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
  const profileBtns = `<button class="nav-btn" id="commision-btn">Commision Art</button>
        <div class="profileimage">
          <a href="./pages/userDashboard.html">
            <img
              id="profileimg"
              src="./images/profile-fallback.svg"
              alt="Profile Picture"
            />
          </a>
        </div>`;
  const loginSignupBtns = `<button class="nav-btn" id="login-btn" onclick="goToLogin()">Login</button>
        <button class="nav-btn" id="signup-btn" onclick="goToSignup()">Sign up</button>`;
  // Get token
  const token = localStorage.getItem("token");
  if (!token) {
    navBtns.innerHTML = "";
    navBtns.innerHTML = loginSignupBtns;

    return;
  }
  const tokenData = parseJwt(token);
  const tokenExpiry = new Date(tokenData.exp * 1000);
  if (token) {
    navBtns.innerHTML = "";
    navBtns.innerHTML = profileBtns;
    return;
  }
  if (new Date() == tokenExpiry) {
    window.open("./pages/login.html", "_self");
  }
});
function parseJwt(token) {
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
