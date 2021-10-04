import Component from "../../../js/Component.js";

class InstructionContainer extends Component {
    setState() {
        return {
            title: 'Saca a Alva del agua',
            message: 'Presiona [W] para caminar hacia adelante',
            btn: 'W'
        }
    }
    update(data) {
        setTimeout(() => {
            this.node.classList.add('fadeIn1')
        }, 100);
        this.state.title = data.title
        this.state.message = data.message
        this.state.btn = data.btn
        this.setNewState(this.state)
    }
    template() {
        return `
    <div class="basic-container">
        <div>
            <div class="title">${this.state.title}</div>
            <div class="message">${this.state.message}</div>
        </div>
        <div class="ok-btn">${this.state.btn}</div>
    </div>`
    }
}

let instructionContainer = new InstructionContainer()
export default instructionContainer;