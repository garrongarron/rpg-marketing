import loopMachine from "../LoopMachine.js";
import scene from "../Scene.js";

class RayLander {
    constructor() {
        this.raycaster = new THREE.Raycaster();
        this.raycaster.layers.set(1);
        this.mesh = null
        this.distanceToGround = null
        this.prev = []
    }
    start(mesh, distanceToGround = .5) {
        this.mesh = mesh
        this.distanceToGround = distanceToGround
        loopMachine.addCallback(this.tick.bind(this))
    }
    tick() {
        let vec3 = this.mesh.position.clone()
        vec3.y++
        this.raycaster.set(vec3, this.mesh.up.negate().normalize())
        const intersected = this.raycaster.intersectObjects(scene.children, true)[0];
        if (intersected) {
            this.prev.push(intersected.distance - this.distanceToGround - 1)
        } else {
            this.prev.push(0)
        }
        if(this.prev.length > 4) {
            this.prev.shift()
        }
        const sum = this.prev.reduce((a, b) => a + b, 0);
        const avg = (sum / this.prev.length) || 0;
        // console.log(avg, this.prev);
        this.mesh.position.y -= avg
    }
    stop() {
        loopMachine.removeCallback(this.tick.bind(this))
    }
}

const rayLander = new RayLander()

export default rayLander