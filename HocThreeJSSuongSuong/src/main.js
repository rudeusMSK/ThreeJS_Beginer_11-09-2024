import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red", wireframe: true});

const cubeMesh = new THREE.Mesh(
    cubeGeometry,
    cubeMaterial
)

const cubeMesh2 = new THREE.Mesh(
    cubeGeometry,
    cubeMaterial
)
cubeMesh2.position.x = 2;

const cubeMesh3 = new THREE.Mesh(
    cubeGeometry,
    cubeMaterial
)
cubeMesh3.position.x = -2;

const group = new THREE.Group();
group.add(cubeMesh);
group.add(cubeMesh2);
group.add(cubeMesh3);


//scene.add(group)
scene.add(cubeMesh)

cubeMesh.rotation.reorder('XYZ')
cubeMesh.rotation.y = 2;
cubeMesh.rotation.y = THREE.MathUtils.degToRad(90)


cubeMesh.position.y = 1
cubeMesh.position.z = 1

//cubeMesh.scale.y = 2

//cubeMesh.scale.set(2, 2, 3)

const secneAxesHepler = new THREE.AxesHelper(2);
const cubeAxesHepler = new THREE.AxesHelper(2);

scene.add(secneAxesHepler);
cubeMesh.add(cubeAxesHepler)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    30
)


camera.position.z = 5

// initialize the render
const canvas = document.querySelector("canvas.threejs")
const render = new THREE.WebGLRenderer({
    canvas: canvas
})

 render.setSize(window.innerWidth, window.innerHeight)
const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
render.setPixelRatio(maxPixelRatio)


// instantiate the controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
//controls.autoRotate = true

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
    render.setSize(window.innerWidth, window.innerHeight)
})


//  initialize the clock
const clock = new THREE.Clock()
let previousTime = 0

const renderloop = () => {

    const currentTime = clock.getElapsedTime()
    const delta = currentTime - previousTime
    previousTime = currentTime

    cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 10

    Math.sin(currentTime)
   cubeMesh.position.x = (Math.sin(currentTime)) * 3 + 2
    controls.update(); render.render(scene, camera)
    window.requestAnimationFrame(renderloop)
}

renderloop()



render.render(scene, camera)