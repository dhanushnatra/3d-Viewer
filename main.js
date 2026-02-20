import {
	FilesetResolver,
	HandLandmarker,
	DrawingUtils,
} from "./vision_bundle.mjs";

import { is_double_pinch } from "./utils/hand_state.js";

import { scale_scene, reset_zoom } from "./utils/zoom_handler.js";

import { HandMotion } from "./utils/state_handler.js";

const videoRef = document.getElementById("video");
let handLandmarker;

const handMotion = new HandMotion();
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
			if (is_double_pinch(results.landmarks)) {
				console.log("Double pinch detected");
				scale_scene(results.landmarks);
			} else {
				reset_zoom();
			}
			if (isRightHand) {
				const hand_motion = handMotion.motion(results.landmarks[i]);
				if (hand_motion) {
					console.log(
						"Hand motion detected:",
						hand_motion.delta_x,
						hand_motion.delta_y,
					);
				}
			}
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
cancelAnimationFrame(animationFrameId);
