import castleguard from "../../character/castleguard/CastleGuar.js"
import Animator from "../Animator.js"
import loopMachine from "../LoopMachine.js"
import scene from "../Scene.js"
import params from "../terrain/Params.js"


class CastleguardController{
    constructor(){
        this.mesh = null
        this.target = null
    }
    start(target){
        this.target = target
        castleguard.then(mesh => {
            this.mesh = mesh
            mesh.position.set(-1, -2, 32)
            scene.add(mesh)
            setTimeout(() => {
                mesh.visible = true
                mesh.position.set(-1.3, 2.8, 0)
            }, 2000);
            this.animations = {
                'asking': 0,
                'kick': 1,
            }
            this.animation = this.animations.asking
            this.animator = new Animator(mesh)
            this.animator.start()
            loopMachine.addCallback(this.lookAt)
        })
    }
    kick(){
        this.animator.action(1, 1, true)
    }
    lookAt = ()=>{
        let position = this.target.position.clone()
        position.y = this.mesh.position.y
        this.mesh.lookAt(position)
        this.animator.action(this.animation, 1, false)
    }
    stop(){
        loopMachine.removeCallback(this.lookAt)
    }
}

const castleguardController = new CastleguardController()

export default castleguardController