import scene from "../Scene.js";
import guiHelper from "./GuiHelper.js";

class PointLightController {
    constructor() {
        this.pointLight = null
    }
    init() {
        this.pointLight = new THREE.PointLight(0xffffff, 1, 4);
        this.pointLight.castShadow = true;
        // Set up shadow properties for the light
        this.pointLight.shadow.bias = -0.001;
        this.pointLight.shadow.mapSize.width = 512 * 4; // default
        this.pointLight.shadow.mapSize.height = 512 * 4; // default
        this.pointLight.shadow.camera.near = 0.5; // default
        this.pointLight.shadow.camera.far = 500; // default
        scene.add(this.pointLight)
        // const pointLightHelper = new THREE.PointLightHelper(this.pointLight, 1);
        // scene.add(pointLightHelper);
        // setTimeout(() => {
        //     guiHelper.start(this.pointLight)
        //     console.log('aaaaaaaaaaaaaaaaaaaa');
        // },1000)
        // console.log('pointLight loaded');
    }
    /**
     * 
     * @param {*} target 
     * @param {*} offset 
     */
    start(target, offset = new THREE.Vector3()) {
        if (!this.pointLight) this.init()
        this.pointLight.position.copy(target.position.clone().add(offset));
    }
    stop() {
        this.pointLight.castShadow = false;
        // scene.remove(this.pointLight)
    }
}

const pointLightController = new PointLightController()

export default pointLightController