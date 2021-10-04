import cache from "../../basic/Cache.js";
import characterControllerZAxes from "../../basic/controllers/CharacterControllerZAxes.js";
import moveController from "../../basic/controllers/MoveController.js";
import eventBus from "../../basic/EventBus.js";
import keyListener from "../../basic/KeyListener.js";
import warrior from "../../character/warrior/Warrior.js";
import instructionContainer from "../../UI/compoment/InstructionContainer.js";
import outOfWater from "./OutOfWater.js";
import talkToOldMan from "./TalkToOldMan.js";

class TutorialGame {
    constructor() {
        this.flag = null
        eventBus.subscribe('outOfWater', this.outOfWater)
        eventBus.subscribe('talkToOldMan', this.talkToOldMan)
    }
    outOfWater = (bool) => {
        if (bool) {
            moveController.stop()
            characterControllerZAxes.pause()
        } else {
            moveController.start(this.mesh)
            talkToOldMan.start()
            characterControllerZAxes.resume()
        }
    }
    talkToOldMan = (bool) =>{
        if (bool) {
            moveController.stop()
            characterControllerZAxes.pause()
            talkToOldMan.stop()
        } else {
            moveController.start(this.mesh)
            characterControllerZAxes.resume()
        }
    }
    init() {
        setTimeout(() => {
            instructionContainer.querySelector('body')
            setTimeout(() => {
                instructionContainer.node.classList.add('fadeIn1')
            }, 100);
        }, 3000);
        warrior.then(mesh => { this.mesh = mesh })
        keyListener.start()
    }
    start() {
        this.init()
        let caster = (data) => {
            eventBus.dispatch('keyListener', data)
        }
        keyListener.setCaster(caster)
        outOfWater.start()
    }
    stop() {
        eventBus.unSubscribe('outOfWater', this.outOfWater)
        cache.appendChild(instructionContainer.node)
    }
}

const tutorialGame = new TutorialGame()

export default tutorialGame
