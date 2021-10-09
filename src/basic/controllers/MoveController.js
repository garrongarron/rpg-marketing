import getDelta from "../Clock.js"
import eventBus from "../EventBus.js"
import keyCode from "../KeyCode.js"
import keyListener from "../KeyListener.js"
import loopMachine from "../LoopMachine.js"

class MoveController {
    constructor() {
        this.target = null
        this.speed = 1
        this.factor = 1
        this.mode = {
            'walk': 1.5 * this.factor,
            'run': 4* this.factor,
        }
        this.delta = 0
        this.direction = 0
    }
    start(target) {
        this.target = target
        this.direction = 0
        loopMachine.addCallback(this.run)
        eventBus.subscribe('keyListener', this.switcher.bind(this))

    }
    stop() {
        loopMachine.removeCallback(this.run)
        eventBus.unSubscribe('keyListener', this.switcher.bind(this))
    }
    switcher(bool) {
        this.speed = (bool[2][keyCode.SHIFT]) ? this.mode.run : this.mode.walk
    }
    run = () => {
        if (keyListener.isPressed(keyCode.KEY_W) || this.direction == 1) {
            let x = Math.sin(this.target.rotation.y) * this.speed * getDelta()
            let z = Math.cos(this.target.rotation.y) * this.speed * getDelta()
            this.target.position.x += x
            this.target.position.z += z
        }
        if (keyListener.isPressed(keyCode.KEY_S) || this.direction == -1) {
            let x = Math.sin(this.target.rotation.y) * this.speed * getDelta()
            let z = Math.cos(this.target.rotation.y) * this.speed * getDelta()
            this.target.position.x -= x
            this.target.position.z -= z
        }


    }
}

const moveController = new MoveController()

export default moveController