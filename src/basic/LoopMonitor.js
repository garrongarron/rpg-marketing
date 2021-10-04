class LoopMonitor{
    constructor(){
        this.loop = null
        this.flag = false
    }
    start(loop){
        this.loop = loop
        this.flag = true
        let monitor = document.querySelector('.loopMachine')
        this.monitor = (!monitor)?document.createElement('div'):monitor
        this.monitor.classList.add('loopMachine')
        setTimeout(() => {
            document.body.appendChild(this.monitor)
        }, 3000);
    }
    run(){
        if(!this.flag) return
        this.monitor.innerText = this.loop.callbacks.length + '::\n'
        this.monitor.innerText += this.loop.callbacks.map((cb, index) => {
            let out = index + ' => ' + cb.toString().split('\n').join('').split('\r').join('')
            // out += cb.toString().split('\n')[1]
            out += `
            ------------------------------------
            `
            return out
        })
    }
    stop(){}
}

const loopMonitor = new LoopMonitor()

export default loopMonitor