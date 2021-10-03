import cache from "../../basic/Cache.js"

class Weel {
    constructor() {
        let wrapper = document.createElement('div')
        wrapper.setAttribute('data-anim', 'base wrapper')
        wrapper.classList.add('wrapper')
        
        let circleL = document.createElement('div')
        circleL.classList.add('circle')
        circleL.setAttribute('data-anim', 'base left')

        let circleR = document.createElement('div')
        circleR.classList.add('circle')
        circleR.setAttribute('data-anim', 'base right')
        wrapper.appendChild(circleL)
        wrapper.appendChild(circleR)
        this.progress = wrapper
    }
    start() {
        document.body.appendChild(this.progress)
    }
    close() {
        cach.appendChild(this.progress)
    }
}

let weel = new Weel()

export default weel