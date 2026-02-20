import { scaleScene } from "../threeD.js";
import { get_distance } from "./vector_calc.js";

let last_dist = null;

function scale_scene(both_landmarks) {
	const dst_btw_thumb_index = get_distance(
		both_landmarks[1][8],
		both_landmarks[0][8],
	);
	if (last_dist === null) {
		last_dist = dst_btw_thumb_index;
		return;
	}
	const delta = dst_btw_thumb_index - last_dist;
	last_dist = dst_btw_thumb_index;
	console.log("Scaling scene with delta:", delta);
	scaleScene(delta);
	return delta;
}

function reset_zoom() {
	last_dist = null;
}

export { scale_scene, reset_zoom };
