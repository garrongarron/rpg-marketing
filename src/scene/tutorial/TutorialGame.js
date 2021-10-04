import cache from "../../basic/Cache.js";
import eventBus from "../../basic/EventBus.js";
import keyListener from "../../basic/KeyListener.js";
import soundHandler from "../../basic/sound/SoundHandler.js";
import InstructionContainer from "../../UI/compoment/InstructionContainer.js";
import weel from "../../UI/compoment/Weel.js";
import ahead from "./Ahead.js";

class TutorialGame {
    constructor() {
        this.content = new InstructionContainer();
    }
    init() {
        setTimeout(() => { 
            this.content.querySelector('body')
            setTimeout(() => {
                this.content.node.classList.add('fadeIn1')
            }, 100);
     }, 3000);
    }
    start() {
        if (!this.keyToTest) this.init()
        let caster = (data) => {
            eventBus.dispatch('keyListener', data)
        }
        keyListener.setCaster(caster)
        ahead.start(this.content)
    }
    stop() { 
        cache.appendChild(this.content.node)
    }
}

const tutorialGame = new TutorialGame()

export default tutorialGame
