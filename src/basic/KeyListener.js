class KeyListener{
    constructor(caster){
        this.keys = {}
        this.caster = caster || console.log;
    }
    setCaster(caster){
        this.caster = caster
    }
    //eventHandler "callback"
    down(e){
        if(this.keys[e.keyCode]) return
        this.keys[e.keyCode] = true
        this.caster([e.keyCode, true, this.keys])
        e.preventDefault()
        e.stopPropagation()
    }
    //eventHandler "callback"
    up(e){
        this.keys[e.keyCode] = false
        this.caster([e.keyCode, false, this.keys])
        e.preventDefault()
        e.stopPropagation()
    }
    isPressed(keyCode){
        return (this.keys[keyCode])?this.keys[keyCode]:false
    }
    start(){
        window.addEventListener('keydown', this.down.bind(this))
        window.addEventListener("keyup", this.up.bind(this))
    }
    stop(){
        window.removeEventListener('keydown', this.down.bind(this))
        window.removeEventListener("keyup", this.up.bind(this))
    }
}

const keyListener = new KeyListener()

export default keyListener