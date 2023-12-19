import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const messages = document.getElementById("messages");
const socket = io("http://localhost:4000");

socket.on("connect", () => {
	console.log("Connected to server");
});
socket.on("disconnect", () => {
	console.log("Disconnected from server");
});
sendButton.addEventListener("click", () => {
	const message = messageInput.value;
	socket.emit("message", message);
	messageInput.value = "";
});
socket.on("message", (message) => {
	const messageElement = document.createElement("div");
	messageElement.innerText = message;
	messages.appendChild(messageElement);
});
