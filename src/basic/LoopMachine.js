class LoopMachine {
    constructor() {
        this.flag = false
        this.callbacks = []
        this.debugger = null
    }
    static store = {};
    debug(bool) {
        this.debugger = bool
    }
    addCallback(callback) {
        let index = this.callbacks.indexOf(callback)
        if (index > -1) return
        this.callbacks.push(callback)
        if (this.debugger)
            this.debugger.run()
    }
    removeCallback(callback) {
        let index = this.callbacks.indexOf(callback)
        if (index > -1) this.callbacks.splice(index, 1)
        if (this.debugger)
            this.debugger.run()
    }
    clean() {
        this.callbacks = []
    }
    run = () => {
        if (!this.flag) return
        this.callbacks.forEach(cb => cb())
        window.requestAnimationFrame(this.run)// segunda y siguientes veces
    }
    start() {
        if (this.flag) return
        this.flag = true
        this.run()// primera vez
    }
    stop() {
        this.flag = false
    }
    nextFrame() {
        console.log('stoping');
        this.start()
        this.flag = false
    }
}

const loopMachine = new LoopMachine()

export default loopMachine
export { LoopMachine }