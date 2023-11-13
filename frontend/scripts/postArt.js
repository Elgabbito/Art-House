const main = document.querySelector(".profile-info");
const username = document.querySelector("#username");
const myArtBtn = document.querySelector("#my-art");
const logoutBtn = document.querySelector("#logout-btn");
const settingsBtn = document.querySelector("#settings");
const newNameInput = document.querySelector("#name-input");
const newEmailInput = document.querySelector("#email-input");
const editProfileBtn = document.querySelector("#edit-profile");
const newPassword = document.querySelector("#new-password-input");
const oldPassword = document.querySelector("#old-password-input");
const deleteAccountBtn = document.querySelector("#delete-account");

// Components
const fileReader = new FileReader(); // initialize the object
const file = document.querySelector("#image-upload-input");
const upload = document.querySelector("#upload");
const uploadstatus = document.querySelector("#status");

// file.addEventListener("change", handleImage);
function handleImage(event) {
  const fileInput = event.target;
  const previewImage = document.getElementById("uploaded-img");

  if (fileInput.files && fileInput.files[0]) {
    const imageFile = fileInput.files[0];

    // Display the selected image
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);

    // Convert the image to Blob
    const blob = new Blob([imageFile], { type: imageFile.type });

    // You can now use the 'blob' variable as needed, e.g., send it to a server.
    console.log("Blob:", blob);
  }
}

upload.addEventListener("click", () => {
  const selectFile = file.files[0];
  const fileName = file.value.split("th\\")[1];
  const url = `http://localhost:3000/art/upload/${fileName}`;
  console.log(file.files, fileName);
  // set status to uploading
  uploadstatus.innerHTML = "uploading…";
  const blob = new Blob([selectFile], { type: selectFile.type });
  const fileReader = new FileReader();
  fileReader.readAsArrayBuffer(blob);

  fileReader.onload = async (event) => {
    const content = event.target.result;
    const CHUNK_SIZE = 1000;
    const totalChunks = event.target.result.byteLength / CHUNK_SIZE;

    // generate a file name
    // const fileName = Math.random().toString(36).slice(-6) + file.files[0].name;

    for (let chunk = 0; chunk < totalChunks + 1; chunk++) {
      let CHUNK = content.slice(chunk * CHUNK_SIZE, (chunk + 1) * CHUNK_SIZE);

      const result = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/octet-stream",
          "content-length": CHUNK.length,
        },
        body: CHUNK,
      });
      if (chunk == totalChunks) {
        console.log(result);
      }
    }
    uploadstatus.innerHTML = "uploaded!!!";
  };
});

function parseJwt() {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
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
  setTimeout(() => document.body.removeChild(NotiElement), 3000);
  // By button click
  document.getElementById("closeBtn").addEventListener("click", () => {
    document.body.removeChild(NotiElement);
  });
}
