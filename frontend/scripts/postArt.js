const description = document.querySelector("#description");
const file = document.querySelector("#image-upload-input");
const title = document.querySelector("#title-input");
const cost = document.querySelector("#cost-input");
const type = document.querySelector("#img-type");

// Upload Data
document.querySelector(".art-form").addEventListener("submit", async (e) => {
	e.preventDefault();
	const formData = new FormData();

	formData.append("art", file.files[0]);
	formData.append("title", title.value);
	formData.append("cost", cost.value);
	formData.append("type", type.value);
	formData.append("description", description.value);

	console.log(file.files[0]);
	const response = await uploadData(formData);
	const image = document.createElement("img");
	const imgContainer = document.querySelector("#uploaded-img");
	imgContainer.backgroundColor = "none";
	image.src = response.data.url;
	imgContainer.appendChild(image);
	if (response.status == 200) {
		addNotification("Uploaded successfully", true);
		return;
	} else {
		addNotification("Failed to upload", false);
	}
});

// Functions
async function uploadData(data) {
	const url = "http://localhost:3000/art/upload";

	try {
		const result = await fetch(url, {
			method: "POST",
			body: data,
		});
		return await result.json();
	} catch (error) {
		return error;
	}
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
	setTimeout(() => document.body.removeChild(NotiElement), 5000);
	// By button click
	document.getElementById("closeBtn").addEventListener("click", () => {
		document.body.removeChild(NotiElement);
	});
}
// window.addEventListener("load",()=>displayLoading("dark"))
function displayLoading(theme) {
	const loadingEl = document.createElement("div");

	loadingEl.id = "stickyNotification";
	loadingEl.style.display = "flex";
	loadingEl.style.alignItems = "center";
	loadingEl.style.position = "absolute";
	loadingEl.style.width = "max-content";
	loadingEl.style.height = "max-content";
	loadingEl.style.padding = "10px";
	loadingEl.style.borderRadius = "5px";
	loadingEl.style.border = "1px solid black";
	loadingEl.style.backgroundColor = theme == "dark" ? "#fae6c7" : "#1c1c1c";
	loadingEl.style.left = "50%";
	loadingEl.style.top = "50%";
	loadingEl.style.transform = "translate(-50%, 50%)";

	loadingEl.innerHTML = ` <span>Loading.</span><div class="loader"></div>`;
	document.body.appendChild(loadingEl);
	//keep it always at the bottom corner of the window
	document.addEventListener("scroll", (event) => {
		let btmPos = -window.scrollY + 10;
		loadingEl.style.bottom = btmPos + "px";
	});
	// Remove popup
	// By timer
	setTimeout(() => document.body.removeChild(loadingEl), 3000);
	// By button click
	document.getElementById("closeBtn").addEventListener("click", () => {
		document.body.removeChild(loadingEl);
	});
}
function removeLoading() {}
// function parseJwt() {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return;
//   }
//   const base64Url = token.split(".")[1];
//   const base64 = base64Url.replace("-", "+").replace("_", "/");
//   return JSON.parse(window.atob(base64));
// }
