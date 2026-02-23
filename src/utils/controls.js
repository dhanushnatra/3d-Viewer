import { change_sensitivity, toggleAxes } from "../threeD.js";

const sensitivity = document.getElementById("sensitivity-control");
const sens_val = document.getElementById("sensitivity-value");

sensitivity.addEventListener("input", (event) => {
	const value = parseFloat(event.target.value);
	sens_val.textContent = value.toFixed(0);
	console.log("Sensitivity changed to:", value);
	change_sensitivity(value);
});

document.getElementById("sensitivity-value").textContent = sensitivity.value;

const videoToggle = document.getElementById("video-toggle");
const videoRef = document.getElementById("mp-canvas");

videoToggle.addEventListener("click", () => {
	if (videoRef.style.display === "none") {
		videoRef.style.display = "block";
		videoToggle.value = 1;
	} else {
		videoRef.style.display = "none";
		videoToggle.value = 0;
	}
});

const showHelp = document.getElementById("toggle-help");
const helpOverlay = document.getElementById("help");

showHelp.addEventListener("click", () => {
	if (helpOverlay.style.display === "none") {
		helpOverlay.style.display = "block";
		showHelp.value = 1;
	} else {
		helpOverlay.style.display = "none";
		showHelp.value = 0;
	}
});
