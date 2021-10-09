import scene from "../Scene.js";

class PointLightController {
    constructor() {
        this.target = null
        this.pointLight =null
    }
    init(){
        this.pointLight = new THREE.PointLight(0xffffff, 16, 4, 4);
        this.pointLight.castShadow = true;
        //Set up shadow properties for the light
        this.pointLight.shadow.mapSize.width = 512*4; // default
        this.pointLight.shadow.mapSize.height = 512*4; // default
        this.pointLight.shadow.camera.near = 0.5; // default
        this.pointLight.shadow.camera.far = 500; // default
        const geometry = new THREE.SphereGeometry(.1, 16, 8);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const sphere = new THREE.Mesh(geometry, material);
        // this.pointLight.add(sphere)
        // const helper = new THREE.CameraHelper(this.pointLight.shadow.camera);
        // scene.add(helper);
        this.pointLight.position.set(-2.3, 50, -0.2);
        // guiHelper.start(this.pointLight)
        scene.add(this.pointLight)
        this.light = this.pointLight
    }
    start(target) {
        if(!this.target) this.init()
        this.target = target
        let pos = this.target.position.clone()
        pos.y += 2
        pos.z -= 1.5

        this.light.position.copy(pos);
    }
    stop() { 
        this.pointLight.castShadow = false;
        scene.remove(this.pointLight)
    }
}

const pointLightController = new PointLightController()

export default pointLightController