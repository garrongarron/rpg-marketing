class LoopMachine {
    constructor() {
        this.flag = false
        this.callbacks = []
    }
    addCallback(callback) {
        this.callbacks.push(callback)
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