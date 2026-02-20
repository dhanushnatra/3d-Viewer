import { Scene } from "./three/Three";
import { AmbientLight } from "./three/Three";
import { PerspectiveCamera } from "./three/Three";
import { WebGLRenderer } from "./three/Three";
import { GLTFLoader } from "./three/GLTFLoader";

const canvas_render = document.getElementById("threeD-canvas");
const canvas_width = canvas_render.width;
const canvas_height = canvas_render.height;

const scene = new Scene();

const camera = new PerspectiveCamera(
	75,
	canvas_width / canvas_height,
	0.1,
	1000,
);

const renderer = new WebGLRenderer({
	canvas: canvas_render,
	width: canvas_width,
	height: canvas_height,
});

const ambientLight = new AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const loader = new GLTFLoader();

const load_model = async (url) => {
	return new Promise((resolve, reject) => {
		loader.load(
			url,
			(gltf) => {
				resolve(gltf);
			},
			undefined,
			(error) => {
				reject(error);
			},
		);
	});
};

const animate = () => {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
};


export {scene,load}