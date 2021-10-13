import cache from "../basic/Cache.js"

class FadeInBlack {
    constructor() {
        this.bg = null
    }
    start(callback) {
        this.bg = document.createElement('div')
        this.bg.classList.add('bg')
        this.bg.classList.add('fadeout-0')
        document.body.appendChild(this.bg)
        setTimeout(() => {
            this.bg.classList.add('fadeout-1')
        }, 10);
        setTimeout(() => {
            if (callback) callback()
        }, 2010);
    }
    stop() {
        if (!this.bg) return 
        this.bg.classList.remove('fadeout-1')
        setTimeout(() => {
            cache.appendChild(this.bg)
        }, 2000);
    }
}

const fadeInBlack = new FadeInBlack()

export default fadeInBlack