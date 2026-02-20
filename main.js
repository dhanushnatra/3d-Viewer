import {
	FilesetResolver,
	HandLandmarker,
	DrawingUtils,
} from "./vision_bundle.mjs";

const videoRef = document.getElementById("video");
let handLandmarker;

let animationFrameId;

async function init() {
	const vision = await FilesetResolver.forVisionTasks("./wasm");

	handLandmarker = await HandLandmarker.createFromOptions(vision, {
		baseOptions: {
			modelAssetPath: "./hand_landmarker.task",
		},
		numHands: 2,
		runningMode: "VIDEO",
	});

	const stream = await navigator.mediaDevices.getUserMedia({
		video: true,
	});

	videoRef.srcObject = stream;

	videoRef.onloadeddata = () => {
		detect();
	};
}

function detect() {
	const video = document.getElementById("video");
	const canvas = document.getElementById("mp-canvas");
	const ctx = canvas.getContext("2d");

	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;

	const results = handLandmarker.detectForVideo(video, performance.now());

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

	if (results.landmarks && results.landmarks.length > 0) {
		const drawingUtils = new DrawingUtils(ctx);
		for (let i = 0; i < results.landmarks.length; i++) {
			const isRightHand =
				results.handedness[i][0].categoryName === "Right";
			// const state = get_state(results.landmarks[i]);
			// hands_states[isRightHand ? "right" : "left"] = state;
			// if (
			// 	hands_states["right"] === "pinching" &&
			// 	hands_states["left"] === "pinching"
			// ) {
			// 	console.log("Both hands are pinching");
			// 	bothPinching = true;
			// }
			// if (!bothPinching) {
			// 	if (state === "pinching") {
			// 		console.log(
			// 			isRightHand ? "Right" : "Left",
			// 			" hand is pinching",
			// 		);
			// 	} else if (state === "pointing") {
			// 		console.log(
			// 			isRightHand ? "Right" : "Left",
			// 			" hand is pointing",
			// 		);
			// 	} else {
			// 		console.log(
			// 			isRightHand ? "Right" : "Left",
			// 			" hand is somthing",
			// 		);
			// 	}
			// }
			const landmarks = results.landmarks[i];

			drawingUtils.drawConnectors(
				landmarks,
				HandLandmarker.HAND_CONNECTIONS,
				{ color: isRightHand ? "#00FF00" : "#FF0000" },
			);
			drawingUtils.drawLandmarks(landmarks, {
				color: isRightHand ? "#00FF00" : "#FF0000",
				fillColor: isRightHand ? "#FF0000" : "#00FF00",
			});
		}
	}
	animationFrameId = requestAnimationFrame(detect);
}

init();
console.log(canvas.width, canvas.height);
cancelAnimationFrame(animationFrameId);
