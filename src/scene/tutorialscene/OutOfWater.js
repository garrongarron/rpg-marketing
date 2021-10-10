import castleguardController from "../../basic/controllers/CastleguardController.js"
import { MovementComponent } from "../../basic/controllers/CharacterController/components/MovementComponent.js"
import { MoveRotateController } from "../../basic/controllers/CharacterController/components/MoveRotateController.js"
import waterSound, { WaterSound } from "../../basic/controllers/CharacterController/components/WaterSound.js"
import tutorialCharacterController from "../../basic/controllers/CharacterController/TutorialCharacterController.js"
import peasantController from "../../basic/controllers/PeasantController.js"
import eventBus from "../../basic/EventBus.js"
import loopMachine from "../../basic/LoopMachine.js"
import soundHandler from "../../basic/sound/SoundHandler.js"
import warrior from "../../character/warrior/Warrior.js"
import instructionContainer from "../../UI/compoment/InstructionContainer.js"
import { progressBar } from "../../UI/compoment/ProgressBar.js"
import wellDone from "../../UI/compoment/WellDone.js"

class OutOfWater {
    constructor() { }
    start() {
        progressBar.querySelector('body')
        instructionContainer.querySelector('body')//botton
        instructionContainer.node.classList.add('fadeIn1')
        wellDone.querySelector('body')//top left
        tutorialCharacterController.addComponents(waterSound)
        loopMachine.addCallback(this.tick)
        warrior.then(mesh => {
            this.warrior = mesh
            castleguardController.start(mesh)//heavy loader.
            peasantController.start(mesh)//heavy loadeing
        })
    }

    tick = () => {
        let z = 22
        let n = 1 - (this.warrior.position.z - z) / (32 - z)
        let value = Math.round(THREE.MathUtils.clamp(n * 100, 0, 100))
        progressBar.update(value)
        if (value == 100) {
            soundHandler.play('plim')
            this.stop()
            instructionContainer.node.classList.remove('fadeIn1')//botom
            wellDone.setEventName('outOfWater')//top left
            setTimeout(() => {
                wellDone.node.classList.add('fadeIn1')//appear top left 
            }, 100);
        }
    }
    stop() {
        tutorialCharacterController.removeComponentByClass(WaterSound)
        tutorialCharacterController.stopComponent(MovementComponent)
        loopMachine.removeCallback(this.tick)
    }
    next(){
        tutorialCharacterController.startComponent(MovementComponent)
        instructionContainer.update({
            title: 'Tutorial',
            message: '[Shift] + [W] para correr.',
            btn: 'W'
        })
    }
}

const outOfWater = new OutOfWater()

export default outOfWater