const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMappingExplosure = 8.3
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setClearColor(0xFFFFFF);
document.body.appendChild(renderer.domElement);
//shadow
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
//pixelratio

renderer.setClearColor(0xff0000, 0);
renderer.setPixelRatio(window.devicePixelRatio);


export default renderer