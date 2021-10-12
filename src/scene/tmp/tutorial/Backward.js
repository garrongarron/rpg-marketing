import eventBus from "../../basic/EventBus.js"
import soundHandler from "../../basic/sound/SoundHandler.js"
import weel from "../../UI/compoment/Weel.js"

class Backward {
    constructor() { 
        this.content = null
    }
    start(content) {
        this.content = content
        eventBus.subscribe('keyListener',this.ahead)
    }
    stop() { 
        eventBus.unSubscribe('keyListener',this.ahead)
    }
    ahead = (data) => {
        if (data[0] == 83) {
            if (data[1]) {
                this.holding()
            } else {
                this.abort()
            }
        }
    }
    holding() {
        weel.start()
        this.n = setTimeout(() => {
            weel.close()
            soundHandler.play('plim')
            this.content.node.classList.remove('fadeIn1')
            setTimeout(() => {
                // this.content.node.classList.remove('fadeOut1')
                // this.content.update({
                //     'title':'Bien Hecho',
                //     'message':'Ahora toca retroceder',
                //     'btn':'S',
                // })
                // backward.start()
                this.stop()
            }, 1000);
        }, 2000);
    }
    abort() {
        weel.close()
        clearTimeout(this.n)
    }
}

const backward = new Backward()

export default backward