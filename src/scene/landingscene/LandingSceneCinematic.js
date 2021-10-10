import camera from "../../basic/Camera.js"
import eventBus from "../../basic/EventBus.js"
import loopMachine from "../../basic/LoopMachine.js"

class LandingSceneCinematic {
    constructor() {
        this.cameraTarget = new THREE.Object3D()
        this.delta = 0
        this.clock = new THREE.Clock();
    }
    start() {
        this.cameraTarget.position.set(0, 5, -3)
        camera.position.set(0, 1.5, 1.5)
        camera.lookAt(this.cameraTarget.position)
        eventBus.subscribe('playNow', this.down)
    }
    down = () => {
        loopMachine.addCallback(this.tick)
    }
    tick = () => {
        this.delta = this.clock.getDelta();
        this.cameraTarget.position.y -= 0.2 * this.delta
        if (this.cameraTarget.position.y < 1.3) {
            loopMachine.removeCallback(this.tick)
        }
        camera.lookAt(this.cameraTarget.position)
    }
    stop() {
        loopMachine.removeCallback(this.tick)
        eventBus.unSubscribe('playNow', this.down)
    }
}

const landingSceneCinematic = new LandingSceneCinematic()

export default landingSceneCinematic