import camera from "../Camera.js";
import loopMachine from "../LoopMachine.js";
import renderer from "../Renderer.js";

class OrbitImplementation {
    constructor() { 
        this.controls = new THREE.OrbitControls(camera, renderer.domElement);
        this.controls.enablePan = false;
        this.controls.enableZoom = true;
        this.target = null
    }
    start(target) {
        this.target = target
        loopMachine.addCallback(this.run.bind(this))
    }
    stop() { 
        loopMachine.removeCallback(this.run.bind(this))
    }
    run(){
        this.controls.target.set(
            this.target.position.x,
            this.target.position.y,
            this.target.position.z,
        );
        this.controls.update();
    }
}

const orbitImplementation = new OrbitImplementation()

export default orbitImplementation