import keyCode from "../../../KeyCode.js"
import AbstractComponent from "./AbstractComponent.js"

class MovementComponent extends AbstractComponent {
    constructor() {
        super()
        this.mode = {
            'walk': 'walk',
            'run': 'run',
        }
        this.controller = null
    }
    setController(controller) {
        this.controller = controller
        if (!this.controller.state.direction) {
            this.controller.state.direction = new THREE.Vector3()
        }
        this.controller.state.mode = this.mode.walk
    }
    modeSwitcher = (data) => {
        this.controller.state.mode = (data[2][keyCode.SHIFT]) ? this.mode.run : this.mode.walk
    }
    start() {
        this.tick = this.run
        this.controller.eventBus.subscribe('keyListener', this.modeSwitcher)
    }
    stop() {
        this.controller.state.direction.z = 0
        this.controller.state.direction.x = 0
        this.controller.eventBus.unSubscribe('keyListener', this.modeSwitcher)
        this.tick = () => { }
    }
    run = () => {
        this.controller.state.direction.z = 0
        this.controller.state.direction.x = 0
        if (this.controller.keyListener.isPressed(keyCode.KEY_W)) {
            this.controller.state.direction.z += 1
        }
        if (this.controller.keyListener.isPressed(keyCode.KEY_S)) {
            this.controller.state.direction.z -= 1
        }
        if (this.controller.keyListener.isPressed(keyCode.KEY_A)) {
            this.controller.state.direction.x += 1
        }
        if (this.controller.keyListener.isPressed(keyCode.KEY_D)) {
            this.controller.state.direction.x -= 1
        }
    }
    tick = () => { }
}
let movementComponent = new MovementComponent
export default movementComponent

export { MovementComponent }