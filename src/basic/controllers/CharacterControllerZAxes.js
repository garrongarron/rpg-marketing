import Animator from "../Animator.js"
import eventBus from "../EventBus.js"
import loopMachine from "../LoopMachine.js"
import keyListener from '../KeyListener.js'

class CharacterControllerZAxes {
    constructor() { }
    start(target) {
        this.target = target
        this.animator = new Animator(this.target)
        this.animator.action(0, 1, false)
        this.animator.start()
        this.animations = {
            'idle': 0,
            'ahead': 1,
            'backward': 2,
            'runAhead': 3,
            'runBackward': 4,
        }
        this.animation = 0
        eventBus.subscribe('keyListener', this.switcher.bind(this))
        loopMachine.addCallback(this.run.bind(this))
        this.runMode = false
    }
    stop() {
        eventBus.unSubscribe('keyListener', this.switcher.bind(this))
        loopMachine.removeCallback(this.run.bind(this))
    }
    switcher(bool) {
        this.runMode = bool[2][16]
        if (this.runMode) {
            if (bool[2][87])
                this.animation = this.animations.runAhead
            if (bool[2][83])
                this.animation = this.animations.runBackward
            if (!bool[2][87] && !bool[2][83])
                this.animation = this.animations.idle
        } else {
            if (bool[2][87])
                this.animation = this.animations.ahead
            if (bool[2][83])
                this.animation = this.animations.backward
            if (!bool[2][87] && !bool[2][83])
                this.animation = this.animations.idle
        }
    }
    run() {
        this.animator.action(this.animation, 1, false)
    }
}

const characterControllerZAxes = new CharacterControllerZAxes()

export default characterControllerZAxes