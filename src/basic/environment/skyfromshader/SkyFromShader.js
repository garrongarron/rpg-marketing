import shaders from './SkyShaders.js'

const uniforms = {
    "topColor": { value: new THREE.Color(0x81C1E2) },//0x2471A3 //0x377C9B //0x81C1E2//0x000000
    "bottomColor": { value: new THREE.Color(0xf9cf8d) },//0xf9cf8d //0xFB9B1A//0x000033
    "offset": { value: 10 },//1
    "exponent": { value: .3 }
};

const skyGeo = new THREE.SphereGeometry(900, 32, 15);
const skyMat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shaders._VS,
    fragmentShader: shaders._FS,
    side: 1 //THREE.BackSide
});

let skyFromShader = new THREE.Mesh(skyGeo, skyMat);

export default skyFromShader