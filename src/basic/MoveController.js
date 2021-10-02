import keyListener from "./KeyListener.js"
import loopMachine from "./LoopMachine.js"

class MoveController{
    constructor(){
        this.target = null
        this.speed = .1
    }
    start(target){
        this.target = target
        loopMachine.addCallback(this.run.bind(this))
    }
    stop(){
        loopMachine.removeCallback(this.run.bind(this))
    }
    run(){
        if(keyListener.isPressed(87)){
            let x = Math.sin(this.target.rotation.y) * this.speed
            let z = Math.cos(this.target.rotation.y) * this.speed
            this.target.position.x += x 
            this.target.position.z += z
        }
        if(keyListener.isPressed(83)){
            let x = Math.sin(this.target.rotation.y) * this.speed
            let z = Math.cos(this.target.rotation.y) * this.speed
            this.target.position.x -= x 
            this.target.position.z -= z
        }
    }
}

const moveController = new MoveController()

export default moveController