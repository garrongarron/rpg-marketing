class LoopMachine {
    constructor() {
        this.flag = false
        this.callbacks = []
        this.monitor = document.createElement('div')
        this.monitor.classList.add('loopMachine')
        document.body.appendChild(this.monitor)
    }
    addCallback(callback) {
        this.callbacks.push(callback)
        this.monitor.innerText = this.callbacks.length + '\n'
        this.monitor.innerText += this.callbacks.map((cb, index)=>{
            let out = index+' => '+cb.toString().split('\n').join('').split('\r').join('')
            // out += cb.toString().split('\n')[1]
            out += `
            ------------------------------------
            `
            return out
        })
    }
    removeCallback(callback) {
        let index = this.callbacks.indexOf(callback)
        if (index > -1) this.callbacks.splice(index, 1)
    }
    clean(){
        this.callbacks = []
    }
    run() {
        if (!this.flag) return
        this.callbacks.forEach(cb =>cb())
        window.requestAnimationFrame(this.run.bind(this))// segunda y siguientes veces
    }
    start() {
        if (this.flag) return
        this.flag = true
        this.run()// primera vez
    }
    stop() {
        this.flag = false
    }
}

const loopMachine = new LoopMachine()

export default loopMachine