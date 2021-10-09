import camera from "../Camera.js"
import loopMachine from "../LoopMachine.js"
import params from "../terrain/Params.js"

class CameraController {
    constructor() {
        this.target = null
        this.hieght = 0
        this.offset = new THREE.Vector3(-2, 0, -5)
        this.lookingAtTarget = true
        this.followTheTarget = true
        // this.lookAtVector = new THREE.Vector3()
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
        let tmp = this.target.position.clone()
        tmp.z = this.target.children[4].children[0].position.z / 100
        tmp.x = this.target.children[4].children[0].position.x / 100
        const vec2 = new THREE.Vector2(tmp.x, tmp.z);
        vec2.rotateAround(new THREE.Vector2(), this.target.rotation.y)
        position.x -= vec2.x
        position.z += vec2.y
        if(this.followTheTarget) this.cameraMove(position)
        if(this.lookingAtTarget) this.lookAt(position)
        // this.lookAtVector.copy(position)
    }
    cameraMove(position){
        let newPosition = position.clone()
        newPosition.add(this.offset)
        camera.position.lerp(newPosition, .1)
        let trying = params.customNoiseGenerator(camera.position.x, -camera.position.z) +.5
        camera.position.y = this.hieght= Math.max(camera.position.y, trying)
    }
    lookAt(position){
        position.y++
        position.x += 1.5
        camera.lookAt(position)
    }
}

const cameraController = new CameraController()

export default cameraController