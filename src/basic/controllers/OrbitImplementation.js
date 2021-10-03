import camera from "../Camera.js";
import loopMachine from "../LoopMachine.js";
import renderer from "../Renderer.js";

class OrbitImplementation {
    constructor() {
        this.controls = new THREE.OrbitControls(camera, renderer.domElement);
        this.controls.enablePan = false;
        this.controls.enableZoom = true;
        this.controls.minDistance = 1
        this.controls.maxDistance = 100

        // this.offset.set(100,100,100)// = new THREE.Vector3(100,100,100)
        this.target = null
    }
    start(target) {
        this.target = target
        loopMachine.addCallback(this.run.bind(this))
    }
    stop() {
        loopMachine.removeCallback(this.run.bind(this))
    }
    run() {
        let target = this.target.position.clone()
        target.y++
        this.controls.target.lerp(target, 0.1);
        this.controls.update();
    }
}

const orbitImplementation = new OrbitImplementation()

export default orbitImplementation