import { get_distance } from "./vector_calc.js";

const INDEX_TIP = 8;
const MIDDLE_TIP = 12;
const RING_TIP = 16;
const PINKY_TIP = 20;
const INDEX_MID = 6;
const MIDDLE_MID = 10;
const RING_MID = 14;
const PINKY_MID = 18;
const THUMB_TIP = 4;

const PINCH_THRESHOLD = 0.05;

function is_pinch(landmarks) {
	const index_finger = landmarks[INDEX_TIP];
	const thumb = landmarks[THUMB_TIP];

	const distance = get_distance(index_finger, thumb) < PINCH_THRESHOLD;

	return distance;
}

function is_pointing(landmarks) {
	const index_finger = landmarks[INDEX_TIP].y < landmarks[INDEX_MID].y;
	const middle_finger = landmarks[MIDDLE_TIP].y > landmarks[MIDDLE_MID].y;
	const ring_finger = landmarks[RING_TIP].y > landmarks[RING_MID].y;
	const pinky_finger = landmarks[PINKY_TIP].y > landmarks[PINKY_MID].y;

	return index_finger && middle_finger && ring_finger && pinky_finger;
}

function get_state(landmarks) {
	if (is_pinch(landmarks)) {
		return "pinching";
	}
	if (is_pointing(landmarks)) {
		return "pointing";
	}
	return "open";
}

export { get_state };
