import getDelta from "../Clock.js"
import eventBus from "../EventBus.js"
import keyListener from "../KeyListener.js"
import loopMachine from "../LoopMachine.js"

class MoveController{
    constructor(){
        this.target = null
        this.speed = .1
        this.delta = 0
        this.direction = 0
    }
    start(target){
        this.target = target
        loopMachine.addCallback(this.run)
        eventBus.subscribe('keyListener', this.switcher.bind(this))
        
    }
    stop(){
        loopMachine.removeCallback(this.run)
        eventBus.unSubscribe('keyListener', this.switcher.bind(this))
    }
    switcher(bool) {
        this.speed = (bool[2][16])?4:1.5
    }
    run = () => {
        if(keyListener.isPressed(87) || this.direction == 1){
            let x = Math.sin(this.target.rotation.y) * this.speed * getDelta()
            let z = Math.cos(this.target.rotation.y) * this.speed * getDelta()
            this.target.position.x += x 
            this.target.position.z += z
        }
        if(keyListener.isPressed(83)|| this.direction == -1){
            let x = Math.sin(this.target.rotation.y) * this.speed * getDelta()
            let z = Math.cos(this.target.rotation.y) * this.speed * getDelta()
            this.target.position.x -= x 
            this.target.position.z -= z
        }
        
        
    }
}

const moveController = new MoveController()

export default moveController