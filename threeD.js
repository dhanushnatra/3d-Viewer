import * as THREE from "./three/Three.js";
import { GLTFLoader } from "./three/GLTFLoader.js";

let scene, camera, renderer, sceneGroup;
let sens = 8;

function init() {
	const threeContainer = document.getElementById("three-container");

	scene = new THREE.Scene();
	scene.background = null;

	camera = new THREE.PerspectiveCamera(
		75,
		threeContainer.clientWidth / threeContainer.clientHeight,
		0.1,
		1000,
	);

	camera.position.z = 5;

	scene.add(camera);

	// Create a group for objects that will be rotated
	sceneGroup = new THREE.Group();
	scene.add(sceneGroup);

	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setSize(threeContainer.clientWidth, threeContainer.clientHeight);
	threeContainer.appendChild(renderer.domElement);

	const ambientLight = new THREE.AmbientLight(0xffffff, 1);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(5, 5, 5);
	scene.add(directionalLight);

	const loader = new GLTFLoader();

	loader.load(
		"./Duck.glb",
		(gltf) => {
			const model = gltf.scene;
			sceneGroup.add(model);
			model.scale.set(1, 1, 1);
			model.position.set(0, 0, 0);
		},
		undefined,
		(error) => {
			console.error("Error loading model:", error);
		},
	);

	animate();
}

function rotateScene(deltaX, deltaY) {
	if (sceneGroup) {
		sceneGroup.rotation.y += deltaX * sens;
		sceneGroup.rotation.x += deltaY * sens;
	}
}

const animate = () => {
	requestAnimationFrame(animate);
	if (renderer && scene && camera) {
		renderer.render(scene, camera);
	}
};

function scaleScene(delta) {
	if (sceneGroup) {
		const scaleFactor = 1 + delta;
		sceneGroup.scale.set(
			sceneGroup.scale.x * scaleFactor,
			sceneGroup.scale.y * scaleFactor,
			sceneGroup.scale.z * scaleFactor,
		);
	}
}

function panCamera(deltaX, deltaY) {
	if (camera) {
		camera.position.x += deltaX * sens;
		camera.position.y += deltaY * sens;
	}
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}

export { rotateScene, panCamera, scaleScene };
