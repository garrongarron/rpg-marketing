import Animator from "../../../Animator.js"
import AbstractComponent from "./AbstractComponent.js"
import meshComponent from "./MeshComponent.js"

class AnimationComponent extends AbstractComponent {
    start() {
        if (!this.animator) {
            this.controller.state.meshPromise.then(mesh => {
                this.animator = new Animator(mesh)
                this.tick = this.run
                this.animator.action(0, 1, false)
                this.animator.start()
            })
        }else{
            this.tick = this.run
            this.animator.start()
        }
        this.animations = {
            'idle': 0,
            'ahead': 1,
            'backward': 2,
            'runAhead': 3,
            'runBackward': 4,
            'attack': 5,
            'impact2': 6,
            'impact3': 7,
        }
        this.mode = {
            'walk': 'walk',
            'run': 'run',
        }
        this.animation = 0
        this.animationSpeed = 1
        this.completeAnimation = false
    }
    stop() {
        if (this.animator) this.animator.stop()
    }
    setController(controller) {
        this.controller = controller
    }
    run = () => {
        this.runMode = this.controller.state.mode == this.mode.run
        if (this.runMode) {
            if (this.controller.state.direction.z > 0)
                this.animation = this.animations.runAhead
            if (this.controller.state.direction.z < 0)
                this.animation = this.animations.runBackward
        } else {
            if (this.controller.state.direction.z > 0)
                this.animation = this.animations.ahead
            if (this.controller.state.direction.z < 0)
                this.animation = this.animations.backward
        }
        if (this.controller.state.direction.z == 0)
            this.animation = this.animations.idle
        this.animator.action(this.animation, this.animationSpeed, this.completeAnimation)
    }
    pause() {
        this.tick = () => { }
    }
    tick = () => { }
}
let animationComponent = new AnimationComponent
export default animationComponent
export { AnimationComponent }