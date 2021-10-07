import scene from '../../Scene.js'
import shaders from './SkyShaders.js'

class SkyFromShader{
    constructor(){
        this.uniforms = null
        this.skyGeo = null
        this.skyMat = null
        this.skyFromShader = null
        this.interval = 0
    }
    init(){
        let top =0x81C1E2//blue
        let bottomColor =0xf9cf8d//'#6A97A9'
        this.uniforms = {
            "topColor": { value: new THREE.Color(top) },//0x2471A3 //0x377C9B //0x81C1E2//0x000000
            "bottomColor": { value: new THREE.Color(bottomColor) },//0xf9cf8d //0xFB9B1A//0x000033
            "offset": { value: 1 },//10
            "exponent": { value: .3 }
        };
        this.skyGeo = new THREE.SphereGeometry(900, 32, 15);
        this.skyMat = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: shaders._VS,
            fragmentShader: shaders._FS,
            side: 1 //THREE.BackSide
        });
        this.skyFromShader = new THREE.Mesh(this.skyGeo, this.skyMat);
    }
    start(target){
        this.target = target
        if(!this.uniforms) this.init()
        scene.add(this.skyFromShader)
        this.interval = setInterval(() => {
            this.skyFromShader.position.copy(this.target.position)
        }, 5000);

    }
    stop(){
        scene.remove(this.skyFromShader)
        clearInterval(this.interval)
    }
}

const skyFromShader = new SkyFromShader()

export default skyFromShader