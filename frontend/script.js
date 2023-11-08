const route = document.getElementById("route");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const basePath = "./index.html";

if (window.location.href === basePath) {
  route.addEventListener("click", () => {
    window.location.href = "http://localhost:5500/frontend/pages/login.html";
  });
}
// Route to login page
loginBtn.addEventListener("click", () => {
  window.open("./pages/login.html", "_self");
});
// Route to signup page
signupBtn.addEventListener("click", () => {
  window.open("./pages/signup.html", "_self");
});
// Check if the user is already logged in
window.addEventListener("load", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.open("hhttp://localhost:5500/frontend/pages/login.html", "_self");
  }
});
