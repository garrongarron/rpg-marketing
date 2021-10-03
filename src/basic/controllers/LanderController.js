import loopMachine from "../LoopMachine.js";
import params from "../terrain/Params.js";

class LanderController{
    constructor(){
        this.mesh = null
        this.distanceToGround = null
        this.loopMachine = null //?
    }
    start(mesh, distanceToGround = .5){
        this.mesh = mesh
        this.distanceToGround = distanceToGround
        loopMachine.addCallback(this.tick.bind(this))       
    }
    tick(){
        let groundY = params.customNoiseGenerator(this.mesh.position.x, -this.mesh.position.z)
        this.mesh.position.y = groundY + this.distanceToGround
    }
    stop(){
        loopMachine.removeCallback(this.tick.bind(this))
    }
}

const landerController = new LanderController()

export default landerController