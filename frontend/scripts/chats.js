import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";
import { baseServerUrl } from "../baseServerUrl.mjs";
import { parseJwt } from "./utils.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

const firebaseConfig = {
	apiKey: "AIzaSyCyixN88gtTJod47KQcLPRqvE-fllls9wU",
	authDomain: "savanna-showcase.firebaseapp.com",
	projectId: "savanna-showcase",
	storageBucket: "savanna-showcase.appspot.com",
	messagingSenderId: "615996047741",
	appId: "1:615996047741:web:01c55c6a966472dbdf4c14",
	measurementId: "G-2NM3HR8JHX",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get("roomId");

const socket = io(`http://localhost:4000?roomId=${roomId}`);
const main = document.querySelector(".main-chat-section");
const username = document.querySelector("#username");
const chatComponent = document.querySelector(".chat");
const chatElements = document.querySelectorAll(".chat-btn");

window.addEventListener("load", loadChat);
window.addEventListener("hashchange", loadChat);
chatElements.forEach((chatElement) => {
	chatElement.addEventListener("click", () => {
		highlightChat(chatElement);
		scrollToBottom(".main-chat-section");
		socket.emit("enterRoom", {
			name: localStorage.getItem("username"),
			room: urlParams.get("roomId"),
		});
	});
});

if (chatComponent) {
	const input = document.querySelector("#chat-input");
	const sendBtn = document.querySelector("#send-btn");

	sendBtn.addEventListener("click", () => {
		console.log(input.value);

		createMessage(
			localStorage.getItem("username"),
			input.value,
			null,
			getTime()
		);
		uploadMessage(parseJwt().userId, input.value, getTime());
		socket.emit("message", {
			userId: parseJwt().userId,
			name: localStorage.getItem("username"),
			text: input.value,
			timeStamp: getTime(),
		});
		scrollToBottom(".main-chat-section");

		input.value = "";
		input.focus();
	});

	input.addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			event.preventDefault();
			sendBtn.click();
		}
	});
	input.addEventListener("keypress", () => {
		socket.emit("activity", localStorage.getItem("username"));
	});

	socket.on("connection", () => {
		console.log("Connected to server", "Socket Id", socket.id);

		socket.join(roomId);
	});

	socket.on("message", (data) => {
		console.log(data);
		console.log(data.name === localStorage.getItem("username"));

		createMessage(data.name, data.text, null, data.timeStamp);
		scrollToBottom(".main-chat-section");
	});

	socket.on("activity", (name) => {
		socket.broadcast.emit("activity", name);
	});

	socket.on("disconnect", () => {
		console.log("Disconnected from server");
		addNotification("Disconnected from server", false);
	});

	// socket.on("activity", (name) => {
	// 	socket.broadcast.emit("activity", name);
	// });
}
// Function Declararions
async function loadChat() {
	username.innerText = `${localStorage.getItem("username") ?? "User"}`;
	if (roomId) {
		// const doc =
		db.collection("Chats")
			.doc(roomId)
			.get()
			.then((querySnapshot) => {
				console.log(querySnapshot);
				// querySnapshot.forEach((doc) => {
				// 	console.log(doc.id, " => ", doc.data());
				// });
			});
		// console.log(doc);
		// if (!doc.exists) {
		// 	console.log("No such document!");
		// } else {
		// 	console.log("Document data:", doc.data());
		// }
	}
	// updateView();
	scrollToBottom(".main-chat-section");
}

function scrollToBottom(elementIdentifier) {
	const element = document.querySelector(elementIdentifier);

	if (element) {
		element.scrollTop = element.scrollHeight;
	} else {
		console.error(`Element with id '${elementIdentifier}' not found.`);
	}
}

function highlightChat(selectedChat) {
	const chatElements = document.querySelectorAll(".chat-btn");
	chatElements.forEach((chatElement) => {
		chatElement.classList.remove("selected-chat");
	});
	selectedChat.classList.add("selected-chat");
}
function getTime() {
	return new Intl.DateTimeFormat("default", {
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	}).format(new Date());
}

function createMessage(name, message, profilePicture, timeStamp) {
	const messages = document.querySelector(".messages");
	const chatBubble = document.createElement("div");
	const senderOrReceiver = name === localStorage.getItem("username");

	if (name === localStorage.getItem("username")) {
		chatBubble.className = "my-msg-container";
	} else {
		chatBubble.className = "their-msg-container";
	}
	chatBubble.innerHTML = `<div class="msg-info">
	<div class="msg-top">
	<span>${name}</span><span class="timestamp">${timeStamp}</span>
	</div>
	<div class="${senderOrReceiver ? "my-msg" : "their-msg"}">${message}</div>
	</div>
	<div class="profile-picture">
	<img src="${
		profilePicture ?? "../images/profile-fallback.svg"
	}" alt="Profile Picture" />
	</div>`;
	messages.appendChild(chatBubble);
}

async function uploadMessage(senderId, message, timeStamp) {
	console.log(senderId, message, timeStamp);
	const url = `${baseServerUrl()}/chat/sendChat`;
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			roomId: roomId,
			senderId: senderId,
			message: message,
			timerStamp: timeStamp,
		}),
	});
	console.log(await response.json());
}

async function getChats(data) {
	// Get userId
	const url = `${baseServerUrl()}/chats/sendChat`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			console.error(`HTTP Error status: ${response.status}`);
		}
		console.log(response);
		return await response.json();
	} catch (error) {
		throw error;
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

// function createMsgElement(name, message) {
// 	const messages = document.querySelector(".messages");
// 	const chatBubble = document.createElement("div");

// 	if (name == localStorage.getItem("username")) {
// 		chatBubble.classList.add("my-msg-container");
// 	} else {
// 		chatBubble.classList.add("their-msg-container");
// 	}
// 	chatBubble.innerHTML = createMessage(name, message,null,time);
// 	messages.appendChild(chatBubble);
// }
