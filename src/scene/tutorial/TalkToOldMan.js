import dialogSystem from "../../basic/dialogsystem/DialogSystem.js"
import eventBus from "../../basic/EventBus.js"
import loopMachine, { LoopMachine } from "../../basic/LoopMachine.js"
import soundHandler from "../../basic/sound/SoundHandler.js"
import warrior from "../../character/warrior/Warrior.js"
import instructionContainer from "../../UI/compoment/InstructionContainer.js"
import { progressBar } from "../../UI/compoment/ProgressBar.js"
import wellDone from "../../UI/compoment/WellDone.js"
import dialog from "./Dialog.js"

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
        eventBus.subscribe('keyListener', this.sound)
    }
    sound = (data) => {
        let walkOrRun = (data[2][16]) ? 'running': 'footstep' 
        let play = data[2][87] || data[2][83]
        if (play) {
            soundHandler.setAsLoop(walkOrRun)
            soundHandler.setVolume(walkOrRun, .4)
            soundHandler.play(walkOrRun)
        }
        let stop = !data[2][87] && !data[2][83]
        if (stop) {
            soundHandler.stop('footstep')
            soundHandler.stop('running')
        }
    }
    init() {
        this.loop.addCallback(this.check)
    }
    check = () => {
        if (this.warrior.position.z * 1 < 1) {
            soundHandler.play('plim')
            this.stop()
            eventBus.dispatch('talkToOldMan', true)
            // instructionContainer.node.classList.remove('fadeIn1')
            let state = {}
            state.title = 'Anciano'
            state.message = 'Guerrero! Bienvenido a nuestras tierras.<a href="#">Leer mas</a>'
            state.button = 'Continuar'
            wellDone.update(state)
            this.update(wellDone.node.querySelector('a'))
            document.querySelector('body').appendChild(wellDone.node)
            wellDone.setEventName('talkToOldMan')
            setTimeout(() => {
                wellDone.node.classList.add('fadeIn1')
            }, 100);
        }
    }
    update(node) {
        dialogSystem.loadContent(dialog)
        node.addEventListener('click', () => {
            dialogSystem.open()
        })
    }
    stop() {
        soundHandler.stop('footstep')
        soundHandler.stop('running')
        eventBus.unSubscribe('keyListener', this.sound)
        dialogSystem.close()
        this.loop.removeCallback(this.check)
    }
}

const talkToOldMan = new TalkToOldMan()

export default talkToOldMan