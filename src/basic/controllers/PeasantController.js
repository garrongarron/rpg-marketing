import peasant from "../../character/peasant/Peasant.js"
import Animator from "../Animator.js"
import loopMachine from "../LoopMachine.js"
import scene from "../Scene.js"
import params from "../terrain/Params.js"


class PeasantController{
    constructor(){
        this.mesh = null
        this.target = null
    }
    start(target){
        this.target = target
        peasant.then(mesh => {
            this.mesh = mesh
            scene.add(mesh)
            mesh.position.set(-1, params.customNoiseGenerator(-1, 5)-3.5, 5)
            
            this.animator = new Animator(mesh)
            this.animator.action(0, 1, false)
            this.animator.start()
            loopMachine.addCallback(this.lookAt)
        })
    }
    lookAt = ()=>{
        this.mesh.lookAt(this.target.position)
    }
    stop(){
        loopMachine.removeCallback(this.lookAt)
    }
}

const peasantController = new PeasantController()

export default peasantController