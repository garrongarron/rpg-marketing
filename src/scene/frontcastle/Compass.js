import camera from "../../basic/Camera.js"
import loopMachine from "../../basic/LoopMachine.js"

class Compass {
    constructor() {
        this.node = null
        this.target = null
    }
    init() {
        let compass = document.querySelector('.compass')
        if (!compass) compass = document.createElement('div')
        this.node = compass
        this.node.classList.add('compass')
        for (let index = 0; index < 24; index++) {
            let value = index*15-180
            if(value ==0) value = 'Norte'
            else if(value ==45) value = 'Nor Este'
            else if(value ==90) value = 'Este'
            else if(value ==-180) value = 'Sur'
            else if(value ==-45) value = 'Nor Oeste'
            else if(value ==-90) value = 'Oeste'
            else if(value ==-135) value = 'Sur Oeste'
            else if(value ==135) value = 'Sur Este'
            else value = '|'
            this.node.innerHTML += '<div class="value">'+(value)+'</div>'
            
        }
        let childRight = this.node.cloneNode(true)
        childRight.classList.add('rigth')
        this.node.appendChild(childRight)

        let childLeft = this.node.cloneNode(true)
        childLeft.classList.add('left')
        this.node.appendChild(childLeft)
        
        document.body.appendChild(this.node)
    }
    start(target) {
        this.target = target
        if (!this.node) this.init()
        loopMachine.addCallback(this.run)
    }
    stop() {
        caches.appendChild(this.node)
        loopMachine.removeCallback(this.run)
    }
    run = () => {
        let target = this.target.position.clone()
        target.y = 0
        let camPos = camera.position.clone()
        camPos.y = 0
        let dir = camPos.sub(target).normalize()
        // var dir = new THREE.Vector3(-camera.position.x, 0, -camera.position.z).normalize();
        var rotation = Math.round((Math.atan2(-dir.x, -dir.z) /(Math.PI)*150))-100
        // let rotation = Math.cos(camera.rotation.y)*100+Math.sin(camera.rotation.y)*100-200
        // Math.round((rotation*100));
        // this.node.style.transform = `translateX(${rotation}%)`
        this.node.style.left = `${rotation}vw`
        // console.log(dir);
        // left: 0;
    }
}

const compass = new Compass()

export default compass