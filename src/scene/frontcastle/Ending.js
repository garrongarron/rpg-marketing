import tutorialCharacterController from "../../basic/controllers/CharacterController/TutorialCharacterController.js";
import { MoveRotateController } from "../../basic/controllers/CharacterController/components/MoveRotateController.js";
import { AnimationComponent } from "../../basic/controllers/CharacterController/components/AnimationComponent.js";

import loopMachine from "../../basic/LoopMachine.js"
import fadeInBlack from "../../UI/FadeInBlack.js";
import advertisement from "./Advertisement.js";
// import fire from "../../fx/Fire.js";

class Ending {
    constructor() {
        this.target = null
        this.done = false
    }
    start(target) {
        this.target = target
        this.center = new THREE.Vector3(0, 20, -354);
        loopMachine.addCallback(this.tick)
    }
    tick = () => {
        if (!this.done && this.target.position.distanceTo(this.center) < 30) {

            tutorialCharacterController.removeComponentByClass(MoveRotateController)
            tutorialCharacterController.getComponentByClass(AnimationComponent).animator.action(0, 1, false)
            tutorialCharacterController.getComponentByClass(AnimationComponent).pause()
            setTimeout(() => {
                tutorialCharacterController.stop()
                loopMachine.clean()
                advertisement.querySelector('body')
                setTimeout(() => {
                    advertisement.node.classList.add('fadeIn1')
                    // fire.start()
                    document.body.style.backgroundImage = 'linear-gradient(black, rgb(151, 56, 56))'
                    document.body.style.backgroundColor = 'black'
                }, 100);
            }, 2000);
            fadeInBlack.start()
            this.stop()
        }
    }
    stop() {
        loopMachine.removeCallback(this.tick)
    }
}

const ending = new Ending()

export default ending