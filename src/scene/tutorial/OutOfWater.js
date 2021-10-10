import eventBus from "../../basic/EventBus.js"
import { LoopMachine } from "../../basic/LoopMachine.js"
import soundHandler from "../../basic/sound/SoundHandler.js"
import warrior from "../../character/warrior/Warrior.js"
import instructionContainer from "../../UI/compoment/InstructionContainer.js"
import { progressBar } from "../../UI/compoment/ProgressBar.js"
import wellDone from "../../UI/compoment/WellDone.js"

class OutOfWater {
    constructor() {
        this.warrior = null
        this.handred = 12
        this.loop = null
    }
    start() {
        warrior.then(mesh => {
            this.warrior = mesh
            setTimeout(() => {
                this.loop = LoopMachine.store['TutorialGame']
                this.loop.addCallback(this.check)
            }, 1000);
        })
        setTimeout(() => {
            instructionContainer.querySelector('body')
            setTimeout(() => {
                instructionContainer.node.classList.add('fadeIn1')
            }, 100);
        }, 3000);
        eventBus.subscribe('keyListener', this.waterSound)
    }
    waterSound = (data) => {
        let play = data[2][87] || data[2][83]
        if(play){
            soundHandler.play('waterWalk')
        }
        let stop = !data[2][87] && !data[2][83]
        if(stop){
            soundHandler.stop('waterWalk')
        }
    }
    check = () => {
        let z = 22
        let n = 1 - (this.warrior.position.z - z) / (32 -z)
        let value = Math.round(THREE.MathUtils.clamp(n * 100, 0, 100))
        progressBar.update(value)
        if (value == 100) {
            soundHandler.play('plim')
            this.stop()
            eventBus.dispatch('outOfWater', true)
            instructionContainer.node.classList.remove('fadeIn1')
            wellDone.setEventName('outOfWater')
            setTimeout(() => {
                wellDone.node.classList.add('fadeIn1')
            }, 100);
        }
    }
    
    stop() {
        soundHandler.stop('waterWalk')
        ///
        soundHandler.stop('footstep')
        eventBus.unSubscribe('keyListener', this.waterSound)
        this.loop.removeCallback(this.check)
    }
}

const outOfWater = new OutOfWater()

export default outOfWater