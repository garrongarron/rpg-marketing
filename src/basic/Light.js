// import scene from "./Scene.js";

const light = new THREE.AmbientLight(0x404040);
// let light = new THREE.AmbientLight(0xffffff, 0.01);

//DIRECTIONAL LIGHT
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
let directionalLight = new THREE.DirectionalLight(0x888888, 0.91);
directionalLight.position.set(0, 100,0);
directionalLight.target.position.set(-30, 0, -30);//see Gravity.js
directionalLight.castShadow = true;
directionalLight.shadow.bias = -0.01;
directionalLight.shadow.mapSize.width = 2048*2;
directionalLight.shadow.mapSize.height = 2048*2;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 150.0;
let gap = 500
directionalLight.shadow.camera.left = gap;
directionalLight.shadow.camera.right = -gap;
directionalLight.shadow.camera.top = gap;
directionalLight.shadow.camera.bottom = -gap;
directionalLight.target.updateMatrixWorld();
// const helper = new THREE.DirectionalLightHelper(directionalLight, 1);
// scene.add(helper);
// const helper2 = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(helper2);

light.add(directionalLight)

let hemiLight = new THREE.HemisphereLight(0xffeeb1, 0xffeeb1, 1)
light.add(hemiLight)



export default light
