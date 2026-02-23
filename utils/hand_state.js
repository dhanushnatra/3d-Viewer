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

const PINCH_THRESHOLD = 0.1;

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

function is_double_pinch(both_landmarks) {
	if (both_landmarks.length < 2) {
		return false;
	}
	const h1_index_tip = both_landmarks[0][INDEX_TIP];
	const h1_thumb = both_landmarks[0][THUMB_TIP];
	const h2_index_tip = both_landmarks[1][INDEX_TIP];
	const h2_thumb = both_landmarks[1][THUMB_TIP];

	const h1_pinch = get_distance(h1_index_tip, h1_thumb) < PINCH_THRESHOLD;
	const h2_pinch = get_distance(h2_index_tip, h2_thumb) < PINCH_THRESHOLD;

	return h1_pinch && h2_pinch;
}

function is_fist(landmarks) {
	const index_finger = landmarks[INDEX_TIP].y > landmarks[INDEX_MID].y;
	const middle_finger = landmarks[MIDDLE_TIP].y > landmarks[MIDDLE_MID].y;
	const ring_finger = landmarks[RING_TIP].y > landmarks[RING_MID].y;
	const pinky_finger = landmarks[PINKY_TIP].y > landmarks[PINKY_MID].y;

	return index_finger && middle_finger && ring_finger && pinky_finger;
}

function get_state(landmarks) {
	if (is_fist(landmarks)) {
		return "fist";
	}
	if (is_pinch(landmarks)) {
		return "pinching";
	}
	if (is_pointing(landmarks)) {
		return "pointing";
	}
	return "open";
}

export { get_state, is_double_pinch };
