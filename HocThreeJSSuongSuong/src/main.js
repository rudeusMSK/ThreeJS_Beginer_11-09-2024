import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight,false );
document.body.appendChild(renderer.domElement);

// Get shape:
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const cricleGeometry = new THREE.TetrahedronGeometry(1, 16, 1);

// Get Material
const box_material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
const boxrotation_material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const Cricle_material = new THREE.MeshBasicMaterial({ color: 0x000ff0});

// Get Green cube and Red cube: 
const cube = new THREE.Mesh(boxGeometry, box_material);
const cubeRotation = new THREE.Mesh(boxGeometry, boxrotation_material);
const cricle = new THREE.Mesh(cricleGeometry, Cricle_material);

// setup camera and cube position:
// box - rotation box - cricle
// camera:
camera.position.z = 5;
camera.position.y = 3;
// shape:
cubeRotation.position.x = 1.5;
cricle.position.x =  cube.position.x - 2 ;

// add shapes to Mesh
scene.add(cube, cubeRotation, cricle);

// Get axe
const axesHeplper1 = new THREE.AxesHelper(2);
const axesHeplper2 = new THREE.AxesHelper(2);
const axesHeplper3 = new THREE.AxesHelper(2);

// add axe to cube:
cube.add(axesHeplper1);
cubeRotation.add(axesHeplper2);
cricle.add(axesHeplper3);

// animations:
function animate() {
	cubeRotation.rotation.y += 0.01;
    renderer.render(scene, camera);
}

// loop:
renderer.setAnimationLoop(animate);

// camera router:
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener( 'change', render); // use if there is no animation loop


