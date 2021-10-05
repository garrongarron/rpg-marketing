import Animator from "../Animator.js"
import eventBus from "../EventBus.js"
import loopMachine from "../LoopMachine.js"

class CharacterControllerZAxes {
    constructor() {
        this.animator = null
        this.justRun = false
        this.animationSpeed = 1
    }
    pause(){
        this.animation = 0
        this.animator.action(this.animation, 1, false)
        this.stop()
    }
    resume(){
        this.start(this.target)
    }
    start(target) {
        this.target = target
        if(!this.animator) this.animator = new Animator(this.target)
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
        eventBus.subscribe('keyListener', this.switcher)
        loopMachine.addCallback(this.run)
        this.runMode = false
    }
    stop() {
        eventBus.unSubscribe('keyListener', this.switcher)
        loopMachine.removeCallback(this.run)
    }
    switcher = (data) => {
        if(this.justRun){
            this.runMode = true
            // this.animationSpeed = 2
        }else {
            // this.animationSpeed = 1
            this.runMode = data[2][16]
        }
        // this.runMode = data[2][16]
        if (this.runMode) {
            if (data[2][87])
                this.animation = this.animations.runAhead
            if (data[2][83])
                this.animation = this.animations.runBackward
            if (!data[2][87] && !data[2][83])
                this.animation = this.animations.idle
        } else {
            if (data[2][87])
                this.animation = this.animations.ahead
            if (data[2][83])
                this.animation = this.animations.backward
            if (!data[2][87] && !data[2][83])
                this.animation = this.animations.idle
        }
    }
    run = () => {
        this.animator.action(this.animation, this.animationSpeed, false)//run
    }
}

const characterControllerZAxes = new CharacterControllerZAxes()

export default characterControllerZAxes