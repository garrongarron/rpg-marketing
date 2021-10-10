import ambientLight from "../../../Light.js"
import scene from "../../../Scene.js"
import AbstractComponent from "./AbstractComponent.js"

class ShadowComponent extends AbstractComponent {
    constructor() {
        super()
        this.controller = null
        this.directionalLight = null
        this.n = 0
        this.offset = new THREE.Vector3(0, 20,15)
        this.mesh = null
    }
    start() {
        if (this.controller.state.meshPromise) {
            this.controller.state.meshPromise.then(mesh => {
                this.directionalLight = ambientLight.children[0]
                this.n = setInterval(this.run, 1000 * 5);
                scene.add(this.directionalLight.target);
                this.mesh = this.controller.state.mesh
                this.run()
            })
        } else {
            console.error('this.controller.state.meshPromise required');
        }
    }
    stop() {
        clearInterval(this.n)
    }
    run = () =>{
        this.directionalLight.target.position.copy(this.controller.state.mesh.position)
        this.directionalLight.position.set(
            this.mesh.position.x + this.offset.x,
            this.mesh.position.y + this.offset.y,
            this.mesh.position.z + this.offset.z
        )
    }
}
let shadowComponent = new ShadowComponent
export default shadowComponent