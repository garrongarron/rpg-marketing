import Component from "../../../js/Component.js";

class Advertisement extends Component {
    addEventListener() { return ['click'] }
    doSomething(e) {
        let url = 'https://www.udemy.com/course/threejs-basico-en-espanol/?referralCode=3985668E0F426CD1BA37'
        window.open(url, '_blank');
    }
    template({}){
        return `<div class="advertisement" click="doSomething">
            <div>Ahora todos pueden crear juegos en Javascript</div>
            <div class="threejs">Three.js Basico</div>
        </div>`
    }
}

let advertisement = new Advertisement();

export default advertisement;