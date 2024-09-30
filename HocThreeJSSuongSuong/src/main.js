import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// const vertices = new Float32Array([
//     2, 2, 0,
//     0, 0, 2,
//     0, 2, 0
// ])

//const bufferAttribute = new THREE.BufferAttribute(vertices, 3);

// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute('position', bufferAttribute)



// const cubeMaterial = new THREE.MeshBasicMaterial({
//    color: "white",
//     wireframe: false,
//     opacity: 0.2,
    
// });

const cubeMaterial = new THREE.MeshLambertMaterial();

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16)

const cubeMesh = new THREE.Mesh(
     cubeGeometry,
    //geometry,
    cubeMaterial
)

// độ bóng bề mặt
const material = new THREE.MeshPhongMaterial()
material.shininess = 200
material.color = new THREE.Color('green')


const cubeMesh2 = new THREE.Mesh(
    cubeGeometry,
    cubeMaterial
)
cubeMesh2.position.x = 2;

const cubeMesh3 = new THREE.Mesh(
    torusKnotGeometry,
    material
)
cubeMesh3.position.x = -2;


 const group = new THREE.Group();
 group.add(cubeMesh);
 group.add(cubeMesh2);
 group.add(cubeMesh3);

//const fog = new THREE.Fog(0xffffff, 1, 10)
//scene.fog = fog

//scene.background = new THREE.Color('white')

scene.add(group)
//scene.add(cubeMesh)

// cubeMesh.rotation.reorder('XYZ')
// cubeMesh.rotation.y = 2;
// cubeMesh.rotation.y = THREE.MathUtils.degToRad(90)


//cubeMesh.position.y = 1
//cubeMesh.position.z = 1

//cubeMesh.scale.y = 2

//cubeMesh.scale.set(2, 2, 3)

const secneAxesHepler = new THREE.AxesHelper(2);
//const cubeAxesHepler = new THREE.AxesHelper(2);

scene.add(secneAxesHepler);
//cubeMesh.add(cubeAxesHepler)


const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)


const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(5, 5, 5)
scene.add(pointLight)


const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // độ sáng của ánh sáng
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

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
    
    cubeMaterial.needsUpdate = true;

//cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 10

//    Math.sin(currentTime)
  // cubeMesh.position.x = (Math.sin(currentTime)) * 3 + 2
    controls.update(); render.render(scene, camera)
    window.requestAnimationFrame(renderloop)
}

renderloop()



render.render(scene, camera)