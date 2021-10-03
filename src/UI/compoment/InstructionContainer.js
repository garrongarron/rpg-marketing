import Component from "../../../js/Component.js";

class InstructionContainer extends Component {
    setState() { return { n: JSON.parse(localStorage.getItem('n')) || 0 } }
    addEventListener() { return ['click'] }
    doSomething(e) {
        console.log('Event: ' + e )
        this.state.n++
        localStorage.setItem('n', JSON.stringify(this.state.n));
        this.setNewState(this.state)
    }
    template(){
        return `
    <div class="basic-container fadeIn1">
        <div>
            <div class="title">Walk ahead</div div class="message">Press [W] to walk ahead
        </div>
        <div class="ok-btn">W</div>
    </div>`
    }
}

export default InstructionContainer;