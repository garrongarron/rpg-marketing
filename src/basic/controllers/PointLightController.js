import scene from "../Scene.js";

class PointLightController {
    constructor() {
        const pointLight = new THREE.PointLight(0xffffff, 8, 4, 4);
        pointLight.castShadow = true;
        //Set up shadow properties for the light
        pointLight.shadow.mapSize.width = 512*4; // default
        pointLight.shadow.mapSize.height = 512*4; // default
        pointLight.shadow.camera.near = 0.5; // default
        pointLight.shadow.camera.far = 500; // default
        const geometry = new THREE.SphereGeometry(.1, 16, 8);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const sphere = new THREE.Mesh(geometry, material);
        // pointLight.add(sphere)
        // const helper = new THREE.CameraHelper(pointLight.shadow.camera);
        // scene.add(helper);
        pointLight.position.set(-2.3, 50, -0.2);
        // guiHelper.start(pointLight)
        scene.add(pointLight)
        this.light = pointLight
        this.target = null
    }
    start(target) {
        this.target = target
        let pos = this.target.position.clone()
        pos.y += 2
        pos.z -= 1.5

        this.light.position.copy(pos);
    }
    stop() { }
}

const pointLightController = new PointLightController()

export default pointLightController