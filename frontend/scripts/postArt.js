const main = document.querySelector(".profile-info");
const username = document.querySelector("#username");
const newNameInput = document.querySelector("#name-input");
const newEmailInput = document.querySelector("#email-input");

// Components
document.querySelector("#upload").addEventListener("click", async (e) => {
  const file = document.querySelector("#image-upload-input").files[0];
  const url = "http://localhost:3000/art/upload";
  const formData = new FormData();

  // Append the file to the FormData object
  formData.append("art", file);
  const result = await fetch(url, {
    method: "POST",
    body: formData,
  });

  e.preventDefault();
  console.log(result);
});

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
  setTimeout(() => document.body.removeChild(NotiElement), 3000);
  // By button click
  document.getElementById("closeBtn").addEventListener("click", () => {
    document.body.removeChild(NotiElement);
  });
}

// function parseJwt() {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return;
//   }
//   const base64Url = token.split(".")[1];
//   const base64 = base64Url.replace("-", "+").replace("_", "/");
//   return JSON.parse(window.atob(base64));
// }
