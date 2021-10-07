import cache from '../Cache.js'
import eventBus from '../EventBus.js'
// import './dialog-system.scss'

class DialogSystem {
    constructor() {
        this.flag = false
        this.ttsAllowed = false
        this.content = null
        this.container = document.createElement('div')
        this.hand = document.createElement('div')
        this.hand.classList.add('hand')
        this.container.classList.add('dialog-system-container')
        this.speaker = document.createElement('div')
        this.speaker.classList.add('dialog-system-container-speaker')
        this.speaker.innerText = ''
        this.speaker.classList.add('hide')
        this.text = document.createElement('div')
        this.text.classList.add('dialog-system-container-text')
        //suggested from sorgindigitala
        this.visible = document.createElement('span')
        this.invisible = document.createElement('span')
        this.invisible.classList.add('invisible')
        this.text.appendChild(this.visible)
        this.text.appendChild(this.invisible)
        this.container.appendChild(this.speaker)
        this.container.appendChild(this.text)
        this.container.appendChild(this.hand)
        this.t = 0
        this.string = ''
        this.tts = new SpeechSynthesisUtterance();
        this.tts.lang = 'es-ES'
        // this.tts.lang = 'es-US'
        this.click = () => {
            if (this.t != 0) {
                clearInterval(this.t)
                this.t = 0
                this.visible.innerText = this.string
                this.invisible.innerText = ''
                return
            }
            if (!this.fetch()) {
                this.close()
            }
        }
    }

    open() {
        if(!this.flag) this.ttsAllowed = confirm("¿Permites que la computadora lea el texto?");
        document.body.appendChild(this.container)
        this.container.classList.add('fadeInDialog')
        this.container.classList.remove('fadeOutDialog')
        this.container.style.opacity = '1'
        setTimeout(() => {
            this.fetch()
        }, 1000);
        this.container.addEventListener('click', this.click)
    }

    fetch() {
        let content = this.content.shift()
        if (typeof content == 'undefined') {
            return false
        }

        let index = 0
        this.string = content[1]
        this.speaker.innerText = content[0]
        eventBus.dispatch('dialogSystem', content[0])
        this.tts.text = content[1]
        if(this.ttsAllowed) window.speechSynthesis.speak(this.tts);
        this.speaker.classList.remove('hide')
        this.t = setInterval(() => {
            index++
            if (index > this.string.length) {
                clearInterval(this.t)
                this.t = 0
                return
            }
            this.visible.innerText = (this.string).slice(0, index)
            this.invisible.innerText = (this.string).slice(index)
        }, 50);
        return true
    }

    close() {
        this.container.classList.add('fadeOutDialog')
        this.container.classList.remove('fadeInDialog')
        this.container.style.opacity = '0'
        this.container.removeEventListener('click', this.click)
        setTimeout(() => {
            cache.appendChild(this.container)
            console.log('saved on cache');
            this.speaker.classList.add('hide')
            this.visible.innerText = ''
            this.invisible.innerText = ''

            if (this.colsing != null) {
                this.colsing()
                this.colsing = null
            }
        }, 500);
    }

    loadContent(content) {
        this.content = content.map(e => e)
    }

    addCloseCallback(callback) {
        this.colsing = callback
    }
}

let dialogSystem = new DialogSystem()

export default dialogSystem