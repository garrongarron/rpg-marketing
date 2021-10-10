import warrior from "../../../../character/warrior/Warrior.js"
import cube from "../../../../shapes/Cube.js"
import scene from "../../../Scene.js"
import AbstractComponent from "./AbstractComponent.js"

class MeshComponent extends AbstractComponent {
    setController(controller) {
        this.controller = controller
        this.controller.state.mesh = cube.clone()
        this.controller.state.meshPromise = warrior
        this.controller.state.meshPromise.then(mesh => {
            this.controller.state.mesh = mesh
            scene.add(mesh)
        })
    }
}
let meshComponent = new MeshComponent()
export default meshComponent