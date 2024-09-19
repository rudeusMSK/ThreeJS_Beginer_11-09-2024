import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight,false );
document.body.appendChild(renderer.domElement);

// Get shape:
// Tạo geometry cho khối hộp
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

// Get GoJo  Material
const GoJo_material = [
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./src/assets/GoJo/gojoc1.png') }), // Mặt 1
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./src/assets/GoJo/gojoc2.png') }), // Mặt 2
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./src/assets/GoJo/gojoc3.png') }), // Mặt 3
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./src/assets/GoJo/gojoc4.png') }), // Mặt 4
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./src/assets/GoJo/gojoc5.png') }), // Mặt 5
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./src/assets/GoJo/gojoc6.png') })  // Mặt 6
];

//Load background texture
const loader = new THREE.TextureLoader();
loader.load('./src/assets/GoJo/geto2.jpg', function (texture) {
    scene.background = texture;
});

// Get  GoJo cube: 
const cubeRotation = new THREE.Mesh(boxGeometry, GoJo_material);

// setup camera and cube position:
// camera:
camera.position.z = 7;

// add shapes to Mesh
scene.add( cubeRotation);
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


