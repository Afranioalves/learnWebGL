import './style.css';
import * as THREE from 'three';
import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";

/*
scene
mesh
camera
renderer

*/

const scene = new THREE.Scene();
scene.background = new THREE.Color('transparent')

const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () =>{
  console.log('starting...')
}

loadingManager.onProgress = () =>{
  console.log('progressing...')
}


loadingManager.onError = () =>{
  console.log('error...')
}

const texture = new THREE.TextureLoader(loadingManager)
const textureColor = texture.load('texture/color.jpg')

// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({map:textureColor});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(1, 0, 2)



const canvas = document.querySelector('.draw');
canvas.addEventListener('dblclick', () => {
    mesh.material.color.set("red");
})
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
//renderer.render(scene, camera)

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; 

const clock = new THREE.Clock();

const animate = () => {
    //const elapsedTime = clock.getElapsedTime();
    //mesh.rotation.x = elapsedTime * Math.PI * 0.5;
    //mesh.rotation.y = elapsedTime * Math.PI * 0.5;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update()
}

animate();
