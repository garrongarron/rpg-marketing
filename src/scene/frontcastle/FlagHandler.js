import sign from "../../basic/buildings/Sign.js";
import pointLightController from "../../basic/controllers/PointLightController.js";
import flagContainer from "../../basic/environment/cloth/FlagContainer.js";
import scene from "../../basic/Scene.js";
import warrior from "../../character/warrior/Warrior.js";

class FlagHandler {
    constructor() { }
    start() {
        let pos = {
            x: 0,
            y: 7.593922879090872 + 2,
            z: -165,
        }
        flagContainer.start()
        flagContainer.cloneFlag({
            x: 1,
            y: 7.593922879090872 + 2,
            z: -165 + .5,
        }, 3)

        let obj = new THREE.Object3D()
        obj.position.set(-1.1, 12.6, -167.7)
        pointLightController.start(obj)
        pointLightController.pointLight.intensity = 4
        pointLightController.pointLight.distance = 10
        pointLightController.pointLight.decay = 2

        // pointLightController.pointLight.castShadow = false

        // warrior.then(mesh => {
        //     mesh.position.copy(pos)
        // })
        let url = 'src/basic/buildings/Signs/alva.png'
        let pos1 = JSON.parse(JSON.stringify(pos))
        pos1.z -= 8
        pos1.x -= 3
        pos1.y -= 2
        sign.start(url, pos1, { x: 0, y: Math.PI * .0, z: 0 })
    }
    stop() { }
}

const flagHandler = new FlagHandler()

export default flagHandler
