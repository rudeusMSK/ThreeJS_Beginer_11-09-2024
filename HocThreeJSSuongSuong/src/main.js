import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight,false );
document.body.appendChild(renderer.domElement);
//
const textreLoader = new THREE.TextureLoader()

// Get shape:
// Tạo geometry cho khối hộp
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);


const cricleGeometry = new THREE.TetrahedronGeometry(1, 16, 1);

//
const texture1 = textreLoader.load('./src/assets/DoiTac.png');
const texture2 = textreLoader.load('./src/assets/DoiTuong2.png');
const texture3 = textreLoader.load('./src/assets/DoiTuong1.png');

// Get Material
const box_material = new THREE.MeshBasicMaterial({});
const boxrotation_material = new THREE.MeshBasicMaterial({ });
const Cricle_material = new THREE.MeshBasicMaterial({});

            
box_material.map = texture1
box_material.needsUpdate = true
boxrotation_material.map = texture2
Cricle_material.map = texture3

// Get Green cube and Red cube: 
const cube = new THREE.Mesh(boxGeometry, box_material);
const cubeRotation = new THREE.Mesh(boxGeometry, boxrotation_material);
const cricle = new THREE.Mesh(cricleGeometry, Cricle_material);

// setup camera and cube position:
// box - rotation box - cricle

// camera:
camera.position.z = 7;
camera.position.y = 3;

// shape:
cubeRotation.position.x = 1.5;
cricle.position.x =  cube.position.x - 2 ;

// add shapes to Mesh
scene.add(cricle, cube, cubeRotation);

// Get axe
const axesHeplper1 = new THREE.AxesHelper(2);
const axesHeplper2 = new THREE.AxesHelper(2);
const axesHeplper3 = new THREE.AxesHelper(2);

//add axe to cube:
cube.add(axesHeplper1);
cubeRotation.add(axesHeplper2);
cricle.add(axesHeplper3);

// animations:
function animate() {
    cubeRotation.rotation.x += 0.01;
    cubeRotation.rotation.y += 0.01;
        cubeRotation.rotation.z += 0.01;
    renderer.render(scene, camera);
}

// loop:
renderer.setAnimationLoop(animate);

// camera router:
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener( 'change', render); // use if there is no animation loop


