
import soundHandler from "../../../sound/SoundHandler.js";
import AbstractComponent from "./AbstractComponent.js"

class WaterSound extends AbstractComponent {
    start() {
        this.prev = false
        if (this.controller.state.direction) {
            this.controller.eventBus.subscribe('moving', this.waterSound)
        } else {
            console.error('this.controller.state.direction required');
        }
    }
    stop() {
        this.controller.eventBus.unSubscribe('moving', this.waterSound)
        soundHandler.stop('waterWalk')
    }
    waterSound = (flag) => {
        if (flag) {
            if (!soundHandler.isPlaying('waterWalk')) {
                soundHandler.play('waterWalk')
            }
        } else {
            soundHandler.stop('waterWalk')
        }
    }
    tick = () => {
        let moving = this.controller.state.direction.z != 0 || this.controller.state.direction.x != 0
        if (this.prev != moving) {
            this.prev = moving
            this.controller.eventBus.dispatch('moving', moving)
        }
    }
}
let waterSound = new WaterSound
export default waterSound
export { WaterSound }