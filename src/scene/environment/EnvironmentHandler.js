import shadowController from "../../basic/controllers/ShadowController.js"
import terrainController from "../../basic/controllers/TarrainController.js"
import skyFromShader from "../../basic/environment/skyfromshader/SkyFromShader.js"
import trees from "../../basic/environment/Trees/Trees.js"
import transparentWater from "../../basic/environment/watertransparent/WaterTransparent.js"
import light from "../../basic/Light.js"
import terrain from "../../basic/terrain/Terrain.js"

class EnvironmentHandler{
    constructor(){
        this.target = null
    }
    start(target){
        this.target = target
        this.scene = this.target.parent
        skyFromShader.start(this.target)
        terrain.start(this.scene)
        terrainController.start(this.target, terrain)
        this.scene.fog = new THREE.FogExp2(0x868293, 0.002);
        this.scene.add(light)
        this.scene.add(transparentWater)// scene.add(water);// dinamicWater.start()
        shadowController.start(this.target, light, new THREE.Vector3(0,5,5))
        let center = new THREE.Vector2()
        trees.start(center, 10, 4)
    }
    night(){
        this.scene.fog = new THREE.FogExp2(0x333333, 0.002);
        skyFromShader.skyFromShader.material.uniforms.topColor.value = new THREE.Color('black')
        skyFromShader.skyFromShader.material.uniforms.bottomColor.value = new THREE.Color(0x385865)
        transparentWater.material.uniforms.color.value = new THREE.Color(0x385865)
        light.children[1].intensity = 0.1
        light.children[0].intensity = 1
        light.intensity = 0.5
        console.log(light);
        shadowController.start(this.target, light, new THREE.Vector3(0,10,-50))
        
    }
    stop(){}
}

const environementHandler = new EnvironmentHandler()

export default environementHandler