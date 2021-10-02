import keyListener from "./KeyListener.js"
import loopMachine from "./LoopMachine.js"

class RotationController{
    constructor(){
        this.target = null
        this.speed = 0.05 //radians
    }
    start(target){
        this.target = target
        loopMachine.addCallback(this.run.bind(this))
    }
    stop(){
        loopMachine.removeCallback(this.run.bind(this))
    }
    run(){
        //clockwise
        if(keyListener.isPressed(68)){
            this.target.rotation.y -= this.speed
        }
        //conter clockwise
        if(keyListener.isPressed(65)){
            this.target.rotation.y += this.speed
        }
    }
}

const ratationController = new RotationController()

export default ratationController