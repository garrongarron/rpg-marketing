import castleguard from "../../character/castleguard/CastleGuar.js"
import Animator from "../Animator.js"
import loopMachine from "../LoopMachine.js"
import scene from "../Scene.js"
import params from "../terrain/Params.js"
import guiHelper from "./GuiHelper.js"


class CastleguardController {
    constructor() {
        this.mesh = null
        this.target = null
        this.lookAtWarrior = true
    }
    start(target) {
        this.target = target
        castleguard.then(mesh => {
            this.mesh = mesh
            mesh.position.set(-1, -2, 32)
            scene.add(mesh)
            setTimeout(() => {
                mesh.visible = true
                mesh.position.set(-1, 2.8, 0)
            }, 2000);
            this.animations = {
                'asking': 0,
                'kick': 1,
                'die': 2,
            }
            this.animation = this.animations.asking
            this.animator = new Animator(mesh)
            this.animator.start()
            loopMachine.addCallback(this.tick)
        })
    }
    die() {
        this.animator.action(this.animations.die, 1, true)
    }
    kick() {
        this.animator.action(this.animations.kick, 1, true)
    }
    tick = () => {
        let position = this.target.position.clone()
        position.y = this.mesh.position.y
        if (this.lookAtWarrior) this.mesh.lookAt(position)
        this.animator.action(this.animation, 1, false)
    }
    stop() {
        this.animator.stop()
        loopMachine.removeCallback(this.tick)
    }
}

const castleguardController = new CastleguardController()

export default castleguardController