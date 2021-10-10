class AbstractComponent{
    constructor(){
        this.controller = null
    }
    start(){}
    stop(){}
    setController(controller){
        this.controller = controller
    }
    tick = () =>{}
}
export default AbstractComponent