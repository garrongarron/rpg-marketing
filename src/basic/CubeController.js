import keyListener from "./KeyListener.js"
import loopMachine from "./LoopMachine.js"

class CubeController{
    constructor(){
        this.target = null
        this.speed = .2
    }
    start(target){
        this.target = target
        loopMachine.addCallback(this.tick.bind(this))
    }
    stop(){
        loopMachine.removeCallback(this.tick.bind(this))
    }
    tick(){
        this.target.position.x += (keyListener.isPressed(65))?this.speed:0
        this.target.position.x -= (keyListener.isPressed(68))?this.speed:0
        this.target.position.z += (keyListener.isPressed(87))?this.speed:0
        this.target.position.z -= (keyListener.isPressed(83))?this.speed:0
    }
}

const cubeController = new CubeController()

export default cubeController