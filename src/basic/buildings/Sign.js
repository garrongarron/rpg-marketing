import cube from "../../shapes/Cube.js"
import scene from "../Scene.js"

class Sign {
    constructor() { }
    start(url, position = new THREE.Vector3(), rotation = new THREE.Vector3()) {
        let group = new THREE.Group()
        //left
        let leftStick = cube.clone(true)
        leftStick.material = leftStick.material.clone()
        leftStick.material.color = new THREE.Color(0xFFFF00)
        leftStick.scale.set(.1, 2, .1)
        leftStick.position.y = 1
        leftStick.position.x = -1
        group.add(leftStick)

        //rigt
        let rightStick = leftStick.clone(true)
        rightStick.scale.set(.1, 2, .1)
        rightStick.position.y = 1
        rightStick.position.x = 1
        group.add(rightStick)

        //top
        let sign = leftStick.clone(true)
        sign.material = sign.material.clone()
        sign.material.color = new THREE.Color(0xFFFFFF)
        sign.material.map = new THREE.TextureLoader().load(url)
        sign.material.needsUpdate = true;
        sign.scale.set(2, 1, .2)
        sign.position.y = 1.52
        sign.position.x = 0
        group.add(sign)
        group.position.copy(position)
        group.rotation.x = rotation.x
        group.rotation.y = rotation.y
        group.rotation.z = rotation.z
        scene.add(group)
    }
    stop() {

    }
}

const sign = new Sign()

export default sign