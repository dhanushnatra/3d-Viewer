import { get_state } from "./hand_state.js";
import { rotateScene, panCamera } from "../threeD.js";

class HandMotion {
	constructor() {
		this.prev_state = "open";
		this.prev_pos = null;
	}

	motion(landmarks) {
		if (this.is_state_change(landmarks)) {
			return null;
		}
		if (this.prev_pos === null) {
			this.prev_pos = { x: landmarks[8].x, y: landmarks[8].y };
			return null;
		}
		const curr_pos = landmarks[8];

		const delta_x = curr_pos.x - this.prev_pos.x;
		const delta_y = curr_pos.y - this.prev_pos.y;

		if (this.prev_state === "pointing") {
			panCamera(delta_x, delta_y);
		} else if (this.prev_state === "pinching") {
			rotateScene(delta_x, delta_y);
		}

		this.prev_pos = { x: curr_pos.x, y: curr_pos.y };

		return { delta_x, delta_y };
	}

	is_state_change(landmarks) {
		const state = get_state(landmarks);
		if (state !== this.prev_state) {
			this.prev_state = state;
			this.prev_pos = null;
			console.log("Hand state changed to:", state);
			return true;
		}
		return false;
	}
}

export { HandMotion };
