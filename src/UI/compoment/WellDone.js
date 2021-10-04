import Component from "../../../js/Component.js";
import eventBus from "../../basic/EventBus.js";

class WellDone extends Component {
    addEventListener() { return ['click'] }
    doSomething(e) {
        e.target.parentNode.classList.remove('fadeIn1')
        eventBus.dispatch('outOfWater', false)
    }
    template({}){
        return `<div class="welldone" >
            <h1>Bien hecho Alva!</h1>
            <p>Ahora tienes que buscar al anciano para que te encomiende una mision. Ve hacia adelante. Presiona [Shift]+[W] para correr. </p>
            <button click="doSomething">Entendido</button>
        </div>`
    }
}


export default WellDone;    