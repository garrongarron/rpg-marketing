import getDelta from "../../../Clock.js"
import AbstractComponent from "./AbstractComponent.js"

class MoveRotateController extends AbstractComponent {
    start() {
        this.target = null
        this.speed = 1
        this.mode = {
            'walk': 1.5,
            'run': 4,
        }
        if (this.controller.state.direction && this.controller.state.mesh) {
            this.tick = this.run
        } else {
            console.error('this.controller.state.direction AND this.controller.state.mesh required');
        }
    }
    stop() {
        this.tick = () => { }
    }
    run = () => {
        this.target = this.controller.state.mesh
        this.speed = this.mode[this.controller.state.mode]
        if (this.controller.state.direction.z > 0) {
            let x = Math.sin(this.target.rotation.y) * this.speed * getDelta()
            let z = Math.cos(this.target.rotation.y) * this.speed * getDelta()
            this.target.position.x += x
            this.target.position.z += z
            this.controller.state.moved = true
        }
        if (this.controller.state.direction.z < 0) {
            let x = Math.sin(this.target.rotation.y) * this.speed * getDelta()
            let z = Math.cos(this.target.rotation.y) * this.speed * getDelta()
            this.target.position.x -= x
            this.target.position.z -= z
            this.controller.state.moved = true
        }
        if (this.controller.state.direction.z == 0 && this.controller.state.direction.x == 0) {
            this.controller.state.moved = false
        }
        // console.log(this.target.position);
    }
    tick = () => { }
}

let moveRotateController = new MoveRotateController()

export default moveRotateController
export { MoveRotateController }