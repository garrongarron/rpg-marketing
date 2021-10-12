import sign from "../../basic/buildings/Sign.js";
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
            z: -165+ .5,
        }, 3)

        const spotLight = new THREE.PointLight(0xffffaa, 1, 10);
        spotLight.position.set(pos.x - 2, pos.y + 3, pos.z - 3);
        scene.add(spotLight);
        let obj = new THREE.Object3D()
        obj.position.set(pos.x, pos.y, pos.z)
        spotLight.target = obj
        scene.add(spotLight.target)

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