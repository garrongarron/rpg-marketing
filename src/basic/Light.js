// import scene from "./Scene.js";

import scene from "./Scene.js";

// const light = new THREE.AmbientLight(0x404040);
let light = new THREE.AmbientLight(0xffffff, 0.6);

//DIRECTIONAL LIGHT
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight.position.set(0, 10,50);
// directionalLight.target.position.set(-30, 0, -30);//see Gravity.js
directionalLight.castShadow = true;
// directionalLight.shadow.bias = 0.0001;
directionalLight.shadow.mapSize.width = 2048 *.5;
directionalLight.shadow.mapSize.height = 2048*.5;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 150.0;
// let gap = 5
// directionalLight.shadow.camera.left = gap;
// directionalLight.shadow.camera.right = -gap;
// directionalLight.shadow.camera.top = gap;
// directionalLight.shadow.camera.bottom = -gap;
// directionalLight.target.updateMatrixWorld();
// const helper = new THREE.DirectionalLightHelper(directionalLight, 1);
// scene.add(helper);
// const helper2 = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(helper2);

light.add(directionalLight)

// const pointLight = new THREE.SpotLight( 0x333333);
// pointLight.position.set( 0,5,0);
// light.add(pointLight)
// const sphereSize = 1;
// const pointLightHelper = new THREE.SpotLightHelper( pointLight );
// scene.add( pointLightHelper );



let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffeeb1, .5)
light.add(hemiLight)



export default light
