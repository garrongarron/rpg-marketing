import otherModule from "./OtherModule.js"



class Lazy{
    message(){
        return 'this is a method '+otherModule.start()
    }
}

const msg = 'this is a constant '+otherModule.stop()

const message = () =>{
    return 'this is a function'
}

export default Lazy
export {msg, message} 