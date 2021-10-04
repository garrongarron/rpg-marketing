import characterControllerZAxes from "../../basic/controllers/CharacterControllerZAxes.js"
import moveController from "../../basic/controllers/MoveController.js"
import eventBus from "../../basic/EventBus.js"
import keyListener from "../../basic/KeyListener.js"
import loopMachine from "../../basic/LoopMachine.js"
import soundHandler from "../../basic/sound/SoundHandler.js"
import warrior from "../../character/warrior/Warrior.js"
import ProgressBar from "../../UI/compoment/ProgressBar.js"
import weel from "../../UI/compoment/Weel.js"
import WellDone from "../../UI/compoment/WellDone.js"
import backward from "./Backward.js"

class Ahead {
    constructor() {
        this.content = null
        this.progressBar = null
        this.warrior = null
        this.handred = 12
    }
    start(content) {
        this.content = content
        this.progressBar = new ProgressBar();
        warrior.then(mesh => {
            this.warrior = mesh
            setTimeout(() => {
                this.progressBar.querySelector('body')
                loopMachine.addCallback(this.check)
            }, 1000);
        })

    }
    check = () => {
        let n = 1 - (this.warrior.position.z - 20) / 12
        let value = Math.round(THREE.MathUtils.clamp(n * 100, 0, 100))
        this.progressBar.update(value)
        if (value == 100) {
            soundHandler.play('plim')
            loopMachine.removeCallback(this.check)
            eventBus.dispatch('outOfWater',true)
            this.content.node.classList.remove('fadeIn1')
            let content = new WellDone();
            content.querySelector('body')
            setTimeout(() => {
                content.node.classList.add('fadeIn1')
            }, 100);
            // setTimeout(() => {
            //     this.content.update({
            //         'title': 'Bien Hecho',
            //         'message': 'Ahora toca retroceder',
            //         'btn': 'S',
            //     })
            // }, 1000);
        }
    }
    stop() {
        loopMachine.removeCallback(this.check)
    }

}

const ahead = new Ahead()

export default ahead