import Component from "../../../js/Component.js";
import cache from "../../basic/Cache.js";
import eventBus from "../../basic/EventBus.js";
import soundHandler from "../../basic/sound/SoundHandler.js";
import btnTutorial from "../BtnTutorialFromIntro.js";
import Story from "../compoment/Story.js"

class PlayNow extends Component {
    addEventListener() { return ['click'] }
    clicking(e) {
        soundHandler.setVolume('fire', .4)
        soundHandler.setAsLoop('epic')
        soundHandler.play('epic')
        soundHandler.play('fire')
        eventBus.dispatch('playNow', true)
        e.target.parentNode.classList.add('fadeout')
        setTimeout(() => {this.drop()},1000)
        setTimeout(() => {
            let s = new Story()
            s.querySelector('body')
            s.start()
            setTimeout(() => {
                btnTutorial(s)
            }, 5000);
        }, 100);
    }
    drop(){
        cache.appendChild(this.node)
    }
    template({ }) {
        return `
        <div class="play-now">
            <h1>The Warrior</h1>
            <div class="beating1" click="clicking">${'Juega ahora'}</div>
        </div>`
    }
}

export default PlayNow;