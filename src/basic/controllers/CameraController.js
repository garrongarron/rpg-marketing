import camera from "../Camera.js"
import loopMachine from "../LoopMachine.js"
import params from "../terrain/Params.js"

class CameraController {
    constructor() {
        this.target = null
        this.hieght = 0
        this.offset = new THREE.Vector3(-2, 0, -5)
    }
    start(target) {
        this.target = target
        loopMachine.addCallback(this.run)
    }
    setTarget(target) {
        this.target = target
    }
    stop() {
        loopMachine.removeCallback(this.run)
    }
    run =()=> {
        let position = this.target.position.clone()
        position.add(this.offset)
        camera.position.lerp(position, .1)
        let trying = params.customNoiseGenerator(camera.position.x, -camera.position.z) +.5
        camera.position.y = this.hieght= Math.max(camera.position.y, trying)
        let target = this.target.position.clone()
        target.y++
        target.x += 1.5
        camera.lookAt(target)
    }
}

const cameraController = new CameraController()

export default cameraController