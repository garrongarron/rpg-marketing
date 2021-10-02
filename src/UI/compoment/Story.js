import Component from "../../../js/Component.js";
import cache from "../../basic/Cache.js";
import btnTutorial from "../BtnTutorialFromIntro.js";

class Story extends Component {
    constructor(){super();this.n = null}
    setState() {
        return {
            'listText': [
                'Hace mucho tiempo atras',
                // 'en una tierra lejana',
                // 'un valiente gerrero llamado Alva',
                // 'lucho una batalla epica',
                // 'buscando la liberacion de su pueblo'
            ]
        }
    }
    getText(p2) {
        let p = document.createElement('p')
        p.innerText = this.state.listText.shift()
        p.classList.add('gradient')
        this.node.appendChild(p)
    }
    start() {
        let p = document.createElement('p')
        this.n = setInterval(() => {
            if (this.state.listText.length == 0) {
                clearInterval(this.n)
                btnTutorial(this)
                return
            }
            this.getText(p)
        }, 3000);
        this.getText(p)
    }
    stop(){
        clearInterval(this.n)
        cache.appendChild(this.node)
    }
    template({ }) {
        return `<div class="shining"></div>`
    }
}

export default Story;