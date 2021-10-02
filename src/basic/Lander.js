import loopMachine from "./LoopMachine.js";
import terrain from "./Terrain.js"

class Lander{
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
        let groundY = terrain(this.mesh.position.x, this.mesh.position.z)
        this.mesh.position.y = groundY + this.distanceToGround
    }
    stop(){
        loopMachine.removeCallback(this.tick.bind(this))
    }
}

const lander = new Lander()

export default lander