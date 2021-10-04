import Component from "../../../js/Component.js";

class ProgressBar extends Component {
    // setState() { return { n: JSON.parse(localStorage.getItem('n')) || 0 } }
    // setChildComponent() { return [Header]; }
    // addEventListener() { return ['click'] }
    // doSomething(e) {
    //     console.log('Event: ' + e )
    //     this.state.n++
    //     localStorage.setItem('n', JSON.stringify(this.state.n));
    //     this.setNewState(this.state)
    // }
    update(value){
        let node = this.node.querySelector('input')
        node.style.background = `linear-gradient(90deg, #fbff00 ${value}%, #ffc0cb00 0%)`
        let label = this.node.querySelector('.slidebar-label')
        label.innerText = `0/${value}`
    }
    template(){
        
        return `<div class="slidebar-container fadeIn1 gold">
            <div class="slidebar-label">0/100</div>
            <input type="range" min="0.01" max="100" value="50" class="slider" 
            style="background: linear-gradient(90deg, rgb(251, 255, 0) 0%, rgba(255, 192, 203, 0) 0%);">
        </div>`
    }
}

export default ProgressBar;