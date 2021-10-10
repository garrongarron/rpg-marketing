import params from "../../../terrain/Params.js"
import AbstractComponent from "./AbstractComponent.js"

class GravityComponent extends AbstractComponent {
    start() {
        this.mesh = null
        this.controller.state.meshPromise.then(mesh => {
            this.mesh = this.controller.state.mesh
            this.tick = this.run
        })
    }
    stop() {
        this.tick = () => { }
    }
    run = () => {
        if (!this.mesh) return
        // if (this.controller.state.moved) {
        let x = this.mesh.position.x
        let z = this.mesh.position.z
        this.mesh.position.y = params.customNoiseGenerator(x, -z)
        // }
    }
}
let gravityComponent = new GravityComponent
export default gravityComponent
export { GravityComponent }