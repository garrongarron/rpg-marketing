const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.outputEncoding = 3001; //THREE.sRGBEncoding;

document.body.appendChild(renderer.domElement);
//shadow
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
//pixelratio

renderer.setClearColor(0xff0000, 0);
renderer.setPixelRatio(window.devicePixelRatio);


export default renderer