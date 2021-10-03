import camera from "../Camera.js"
import loopMachine from "../LoopMachine.js"
import params from "../terrain/Params.js"

class CameraController {
    constructor() {
        this.target = null
        this. hieght = 0
    }
    start(target) {
        this.target = target
        loopMachine.addCallback(this.run.bind(this))
    }
    stop() {
        loopMachine.removeCallback(this.run.bind(this))
    }
    run() {
        let position = this.target.position.clone()
        position.add(new THREE.Vector3(-2, 0, -6))
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