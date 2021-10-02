import camera from "../Camera.js"
import loopMachine from "../LoopMachine.js"

class CameraController{
    constructor(){
        this.target = null
    }
    start(target){
        this.target = target
        loopMachine.addCallback(this.run.bind(this))
    }
    stop(){
        loopMachine.removeCallback(this.run.bind(this))
    }
    run(){
        let position = this.target.position.clone()
        position.add(new THREE.Vector3(0, 5, 5))
        camera.position.lerp ( position, .1 )
        camera.lookAt(this.target.position)
    }
}

const cameraController = new CameraController()

export default cameraController