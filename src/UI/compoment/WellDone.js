import Component from "../../../js/Component.js";
import eventBus from "../../basic/EventBus.js";

class WellDone extends Component {
    constructor(){
        super()
        this.eventName = null
    }
    setState(){
        let state = {}
        state.title = 'Bien hecho Alva!'
        state.message = 'Ahora tienes que buscar al anciano para que te encomiende una misión. Ve hacia adelante. Presiona [Shift]+[W] para correr. '
        state.button = 'Entendido'
        return state
    }
    addEventListener() { return ['click'] }
    setEventName(eventName){
        this.eventName = eventName
    }
    doSomething(e) {
        e.preventDefault()
        e.target.parentNode.classList.remove('fadeIn1')
        eventBus.dispatch(this.eventName, false)
    }
    update(state){
        this.state = state
        this.setNewState(this.state)
    }
    setNextMessage(message){
        this.state.message = message
    }
    template({}){
        return `<div class="welldone" >
            <h1>${this.state.title}</h1>
            <p>${this.state.message}</p>
            <button click="doSomething">${this.state.button}</button>
        </div>`
    }
}

let wellDone = new WellDone()

export default wellDone;    