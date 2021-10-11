import camera from "../Camera.js";
import loopMachine from "../LoopMachine.js";
import renderer from "../Renderer.js";
import '../terrain/Filters.js'
class OrbitImplementation {
    constructor() {
        this.target = null
        this.following = { value: true }
        window.orbitImplementation = { 
            following: this.following 
        }

    }
    init() {
        this.controls = new THREE.OrbitControls(camera, renderer.domElement);
        this.controls.enablePan = false;
        this.controls.enableZoom = true;
        this.controls.minDistance = 1
        this.controls.maxDistance = 10
    }
    start(target) {
        if (!this.target) this.init()
        this.target = target
        loopMachine.addCallback(this.run)
    }
    stop() {
        loopMachine.removeCallback(this.run)
    }
    run = () => {
        if(this.following.value){
            let target = this.target.position.clone()
            target.y++
            this.controls.target.lerp(target, 0.1);
            this.controls.update();
        }
    }
    follow(val){
        this.following.value = val
    }
}

const orbitImplementation = new OrbitImplementation()

export default orbitImplementation