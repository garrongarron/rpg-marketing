import soundHandler from "../../../sound/SoundHandler.js"
import AbstractComponent from "./AbstractComponent.js"

class WalkingSoundComponent extends AbstractComponent {
    start() {
        if (this.controller.state.direction && this.controller.state.mode) {
            this.tick = this.sound
        } else {
            console.error('this.controller.state.direction AND this.controller.state.mode required');
        }
    }
    sound = () => {
        let current = (this.controller.state.mode == 'run') ? 'running' : 'footstep'
        let oposite = (this.controller.state.mode != 'run') ? 'running' : 'footstep'
        let play = this.controller.state.direction.z != 0
        if (play) {
            if (!soundHandler.isPlaying(current)) {
                soundHandler.setAsLoop(current)
                soundHandler.setVolume(current, .4)
                soundHandler.play(current)
                soundHandler.stop(oposite)
            }
        }
        let stop = this.controller.state.direction.z == 0
        if (stop) {
            soundHandler.stop(oposite)
            soundHandler.stop(current)
        }
    }
    tick = () => { }
    stop = () =>{
        soundHandler.setVolume('running',0)
        soundHandler.setVolume('footstep',0)
    }
}
let walkingSoundComponent = new WalkingSoundComponent
export default walkingSoundComponent