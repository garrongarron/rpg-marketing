import dialogSystem from "../../basic/dialogsystem/DialogSystem.js"
import eventBus from "../../basic/EventBus.js"
import loopMachine, { LoopMachine } from "../../basic/LoopMachine.js"
import soundHandler from "../../basic/sound/SoundHandler.js"
import warrior from "../../character/warrior/Warrior.js"
import instructionContainer from "../../UI/compoment/InstructionContainer.js"
import { progressBar } from "../../UI/compoment/ProgressBar.js"
import wellDone from "../../UI/compoment/WellDone.js"
import dialog from "./Dialog.js"

class FirstCombat {
    constructor() {
        this.warrior = null
        this.handred = 12
        this.loop = null
        this.runMessage = null
    }
    start() {
        this.loop = LoopMachine.store['TutorialGame']
        warrior.then(mesh => {
            this.warrior = mesh
            this.init()
        })
        eventBus.subscribe('keyListener', this.sound)
    }
    sound = (data) => {
        let current = (data[2][16]) ? 'running' : 'footstep'
        let oposite = (!data[2][16]) ? 'running' : 'footstep'
        let play = data[2][87] || data[2][83]
        if (play) {
            soundHandler.setAsLoop(current)
            soundHandler.setVolume(current, .4)
            soundHandler.play(current)
        }
        if (!data[1]) {
            soundHandler.stop(oposite)
            soundHandler.stop(current)
        }

    }
    init() {
        this.loop.addCallback(this.check)
    }
    check = () => {
        // this.warrior.children[4].children[0].position.x = 0
        // this.warrior.children[4].children[0].position.y = 0
        // this.warrior.children[4].children[0].position.z = 0
        
        // console.log(this.warrior);
        // this.loop.stop()
        if (!this.runMessage && this.warrior.position.z * 1 < 5) {
            this.runMessage = true
            instructionContainer.node.classList.remove('fadeIn1')
        }
        if (this.warrior.position.z * 1 < 1) {
            soundHandler.play('plim')
            this.stop()
            eventBus.dispatch('firstCombat', true)
            // instructionContainer.node.classList.remove('fadeIn1')
            let state = {}
            state.title = 'Guardia del Castillo'
            state.message = 'Hey Guerrero! ¿Que haces vestido asi? ¿Acaso eres tú Alva Majo?'
            state.button = 'Sí! Soy Alva Majo'
            wellDone.update(state)
            document.querySelector('body').appendChild(wellDone.node)
            wellDone.setEventName('firstCombat')
            setTimeout(() => {
                wellDone.node.classList.add('fadeIn1')
            }, 100);
        }
    }

    stop() {
        soundHandler.stop('footstep')
        soundHandler.stop('running')
        eventBus.unSubscribe('keyListener', this.sound)
        this.loop.removeCallback(this.check)
    }
}

const firstCombat = new FirstCombat()

export default firstCombat