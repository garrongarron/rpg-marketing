import peasant from "../../character/peasant/Peasant.js"
import Animator from "../Animator.js"
import loopMachine from "../LoopMachine.js"
import scene from "../Scene.js"
// import params from "../terrain/Params.js"
// import guiHelper from "./GuiHelper.js"
// import pointLightController from "./PointLightController.js"
// import guiHelper from "./GuiHelper.js"

class PeasantController {
    constructor() {
        this.mesh = null
        this.target = null
    }
    start(target) {
        this.target = target
        peasant.then(mesh => {
            this.mesh = mesh
            mesh.position.set(-1, -2, 32)
            scene.add(mesh)

            setTimeout(() => {
                mesh.visible = true
                mesh.position.set(0.5, 3.9, -6.2)
                // guiHelper.start(mesh)
                // const axesHelper = new THREE.AxesHelper(5);
                // scene.add(axesHelper);
                // axesHelper.position.set(10, 3.5, 6)
            }, 2000);

            this.animator = new Animator(mesh)
            this.animator.action(0, 1, false)
            this.animator.start()
            loopMachine.addCallback(this.lookAt)
        })
    }

    lookAt = () => {
        let position = this.target.position.clone()
        position.y = this.mesh.position.y
        this.mesh.lookAt(position)
    }
    stop() {
        loopMachine.removeCallback(this.lookAt)
    }
}

const peasantController = new PeasantController()

export default peasantController