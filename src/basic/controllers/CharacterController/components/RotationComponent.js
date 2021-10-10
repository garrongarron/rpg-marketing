import getDelta from "../../../Clock.js";
import AbstractComponent from "./AbstractComponent.js"

class RotationComponent extends AbstractComponent{
    start() {
        this.target = null
        this.speed = 2.5
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
        if (this.controller.state.direction.x > 0) {
            this.target.rotation.y +=  this.speed * getDelta()
        }
        if (this.controller.state.direction.x < 0) {
            this.target.rotation.y -=  this.speed * getDelta()
        }
    }
    tick = () => { }
}
let rotationComponent = new RotationComponent
export default rotationComponent    