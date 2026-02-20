let glb_url;

import { rerender } from "./threeD.js";

document.addEventListener("dragover", (event) => {
	event.preventDefault();
});

document.addEventListener("drop", (event) => {
	event.preventDefault();
	const files = event.dataTransfer.files;
	if (files.length > 0) {
		const file = files[0];
		if (file.name.endsWith(".glb")) {
			glb_url = URL.createObjectURL(file);
			console.log("GLB file dropped:", glb_url);

			rerender();
		} else {
			console.error("Please drop a .glb file.");
		}
	}
});

export { glb_url };
