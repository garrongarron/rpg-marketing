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

    }
    check = () => {
        let n = 1 - (this.warrior.position.z - 20) / 12
        let value = Math.round(THREE.MathUtils.clamp(n * 100, 0, 100))
        progressBar.update(value)
        if (value == 100) {
            soundHandler.play('plim')
            this.stop()
            eventBus.dispatch('outOfWater',true)
            instructionContainer.node.classList.remove('fadeIn1')
            wellDone.setEventName('outOfWater')
            setTimeout(() => {
                wellDone.node.classList.add('fadeIn1')
            }, 100);
        }
    }
    stop() {
        this.loop.removeCallback(this.check)
    }
}

const outOfWater = new OutOfWater()

export default outOfWater