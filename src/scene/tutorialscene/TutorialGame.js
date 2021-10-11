import pointLightController from "../../basic/controllers/PointLightController.js"
import eventBus from "../../basic/EventBus.js"
import castleguard from "../../character/castleguard/CastleGuar.js"
import peasant from "../../character/peasant/Peasant.js"
import firstCombat from "./FirstCombat.js"
import outOfWater from "./OutOfWater.js"
import talkToOldMan from "./TalkToOldMan.js"

class TutorialGame {
    constructor() { }
    start() {
        peasant.then(peasant => { 
            this.peasant = peasant 
            //preload light
            pointLightController.start(peasant)
        })
        castleguard.then(guard => { this.guard = guard })
        eventBus.subscribe('outOfWater', this.outOfWaterEnds)
        eventBus.subscribe('firstCombat', this.firstCombatEnds)
        eventBus.subscribe('talkToOldMan', this.talkToOldManEnds)
        outOfWater.start()
    }
    outOfWaterEnds = () => {
        outOfWater.next()
        firstCombat.start()
    }
    firstCombatEnds = () => {
        firstCombat.next()
        talkToOldMan.start()
    }
    talkToOldManEnds = (bool) => {
        if (bool) {
            talkToOldMan.next()
        } else {
            talkToOldMan.end()
        }
    }
    stop() { }
}

const tutorialGame = new TutorialGame()

export default tutorialGame