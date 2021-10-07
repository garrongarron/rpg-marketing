import shadowController from "../../basic/controllers/ShadowController.js"
import terrainController from "../../basic/controllers/TarrainController.js"
import skyFromShader from "../../basic/environment/skyfromshader/SkyFromShader.js"
import trees from "../../basic/environment/Trees/Trees.js"
import transparentWater from "../../basic/environment/watertransparent/WaterTransparent.js"
import light from "../../basic/Light.js"
import terrain from "../../basic/terrain/Terrain.js"

class EnvironmentHandler {
    constructor() {
        this.target = null
        this.dayLighting = null
    }
    start(target) {
        if (this.dayLighting) {
            light.children[0].intensity = this.dayLighting.children[0].intensity////directional #1
            light.children[0].castShadow = this.dayLighting.children[0].castShadow;
            light.children[1].intensity = this.dayLighting.children[1].intensity
            light.children[2].intensity = this.dayLighting.children[2].intensity////directional #2
            light.intensity = this.dayLighting.intensity //ambient
            skyFromShader.skyFromShader.material.uniforms.topColor.value = this.dayLighting.topColor
            skyFromShader.skyFromShader.material.uniforms.bottomColor.value = this.dayLighting.bottomColor
            terrain.updateTerrain()
        }
        this.target = target
        skyFromShader.start(this.target)
        this.dayLighting = light.clone(true)
        this.dayLighting.topColor = skyFromShader.uniforms.topColor.value
        this.dayLighting.bottomColor = skyFromShader.uniforms.bottomColor.value        
        this.scene = this.target.parent
        
        terrain.start(this.scene)
        terrainController.start(this.target, terrain)
        this.scene.fog = new THREE.FogExp2(0x868293, 0.002);
        this.scene.fog.far = 10000;
        this.scene.add(light)
        this.scene.add(transparentWater)// scene.add(water);// dinamicWater.start()
        shadowController.start(this.target, light, new THREE.Vector3(0, 100, 0))
        let center = new THREE.Vector2()
        trees.start(center, 10, 4)
    }
    night() {
        this.scene.fog = new THREE.FogExp2(0x000000, 0.002);
        skyFromShader.skyFromShader.material.uniforms.topColor.value = new THREE.Color('black')
        skyFromShader.skyFromShader.material.uniforms.bottomColor.value = new THREE.Color(0x385865)
        transparentWater.material.uniforms.color.value = new THREE.Color(0x385865)
        light.children[0].intensity = 0.01////directional #1
        light.children[0].castShadow = false;
        light.children[1].intensity = 0.01
        light.children[2].intensity = 0.01////directional #2
        light.intensity = 0.01 //ambient
        // console.log(light);
        shadowController.start(this.target, light, new THREE.Vector3(0, 100, -50))

    }
    stop() {
        skyFromShader.stop()
        terrain.stop()
        terrainController.stop()
        shadowController.stop()
        trees.stop()
        this.scene.remove(light)
        this.scene.remove(transparentWater)
        this.scene.fog.near = 0.1;
        this.scene.fog.far = 0;
    }
}

const environementHandler = new EnvironmentHandler()

export default environementHandler