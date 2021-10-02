import Component from "../../../js/Component.js";
import cache from "../../basic/Cache.js";
import eventBus from "../../basic/EventBus.js";
import soundHandler from "../../basic/sound/SoundHandler.js";
// import story from "../Story.js";
import Story from "../compoment/Story.js"

class PlayNow extends Component {
    constructor() {
        super()
        this.fadeOut = () => console.error('character no loaded');
        eventBus.subscribe('characterLoaded', (landing) => {
            this.fadeOut = () => {
                landing.down()
                landing.rotation()
            }
        })
    }
    addEventListener() { return ['click'] }
    clicking(e) {
        soundHandler.setVolume('fire', .2)
        soundHandler.play('epic')
        soundHandler.play('fire')
        e.target.parentNode.classList.add('fadeout')
        setTimeout(() => {
            // story.start()
            let s = new Story()
            s.querySelector('body')
            s.start()
        }, 3000);
        this.fadeOut()
    }
    drop(){
        cache.appendChild(this.node)
    }
    template({ }) {
        return `
        <div class="play-now">
            <h1>The Warrior</h1>
            <div class="beating1" click="clicking">Play Now</div>
        </div>`
    }
}

export default PlayNow;