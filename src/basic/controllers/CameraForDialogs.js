import camera from "../Camera.js"
import loopMachine from "../LoopMachine.js"

class CameraForDialogs {
    constructor() {
        this.flag = false
        this.target = null
        this.prev = new THREE.Vector3()
    }
    setPrev(prev){
        this.prev = prev
    }
    start(target) {
        this.target = target
        if(!this.flag){
            loopMachine.addCallback(this.run)
            this.flag = true
        }
    }
    run = () => {
        let position = this.prev.lerp(this.target, .1)
        camera.lookAt(position)
    }
    stop() {
        loopMachine.removeCallback(this.run)
    }
}

const cameraForDialogs = new CameraForDialogs()

export default cameraForDialogs