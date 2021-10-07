// import scene from "./Scene.js";

import scene from "./Scene.js";

// let directionalLight = new THREE.AmbientLight(0xffffff, 0.125);//0x303030
let ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.125);

//0
let directionalLight = new THREE.DirectionalLight(0xFFFFFF, .8);
// directionalLight.position.set(-100, 100, 100);
// directionalLight.target.position.set(0, 0, 0);
directionalLight.castShadow = true;
directionalLight.shadow.bias = -0.001;
directionalLight.shadow.mapSize.width = 512*2;
directionalLight.shadow.mapSize.height = 512*2;

directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500.0;
let gap = 50
directionalLight.shadow.camera.left = gap;
directionalLight.shadow.camera.right = -gap;
directionalLight.shadow.camera.top = gap;
directionalLight.shadow.camera.bottom = -gap;

// const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
// scene.add(helper)
// const helper2 = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(helper2);

ambientLight.add(directionalLight)


//1
let hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0xaaaaaa, .8)
ambientLight.add(hemisphereLight)

//2
// let directionalLight2 = new THREE.DirectionalLight(0xdddddd, .2);
// ambientLight.add(directionalLight2)

export default ambientLight
