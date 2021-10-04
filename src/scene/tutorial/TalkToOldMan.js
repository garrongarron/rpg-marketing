import eventBus from "../../basic/EventBus.js"
import loopMachine, { LoopMachine } from "../../basic/LoopMachine.js"
import soundHandler from "../../basic/sound/SoundHandler.js"
import warrior from "../../character/warrior/Warrior.js"
import instructionContainer from "../../UI/compoment/InstructionContainer.js"
import { progressBar } from "../../UI/compoment/ProgressBar.js"
import wellDone from "../../UI/compoment/WellDone.js"

class TalkToOldMan {
    constructor() {
        this.warrior = null
        this.handred = 12
        this.loop = null
    }
    start() {
        this.loop = LoopMachine.store['TutorialGame']
        warrior.then(mesh => {
            this.warrior = mesh
            setTimeout(() => {
                document.querySelector('body').appendChild(progressBar.node)
                this.init()
            }, 1000);
        })
    }
    init() {
        this.loop.addCallback(this.check)
    }
    check = () => {
        if (this.warrior.position.z * 1 < 5) {
            soundHandler.play('plim')
            this.stop()
            eventBus.dispatch('talkToOldMan', true)
            // instructionContainer.node.classList.remove('fadeIn1')
            document.querySelector('body').appendChild(wellDone.node)
            wellDone.setEventName('talkToOldMan')
            setTimeout(() => {
                wellDone.node.classList.add('fadeIn1')
            }, 100);
        }
    }
    stop() {
        this.loop.removeCallback(this.check)
    }
}

const talkToOldMan = new TalkToOldMan()

export default talkToOldMan