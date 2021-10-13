import headquarter from "../buildings/Headquarter.js";
import loopMachine from "../LoopMachine.js";
import terrain from "../terrain/Terrain.js";

class RayLander {
    constructor() {
        this.raycaster = new THREE.Raycaster();
        // this.raycaster.layers.set(1);
        this.mesh = null
        this.distanceToGround = null
        this.prev = []
        let array = [terrain.group]
        this.objectsToIntersect = array
        headquarter.then(mesh=>{
            array.push(mesh)
        })
    }
    start(mesh, distanceToGround = .5) {
        this.mesh = mesh
        this.distanceToGround = distanceToGround
        loopMachine.addCallback(this.tick)
    }
    tick = () =>{
        let vec3 = this.mesh.position.clone()
        vec3.y++
        this.raycaster.set(vec3, this.mesh.up.negate().normalize(), 0, 10)
        const intersected = this.raycaster.intersectObjects(this.objectsToIntersect, true)[0];
        if (intersected) {
            if (Math.abs(intersected.distance - this.distanceToGround - 1) < .5) {
                this.prev.push(intersected.distance - this.distanceToGround - 1)
            } else {
                return
            }
        } else {
            this.prev.push(0)
        }
        if (this.prev.length > 2) {
            this.prev.shift()
        }
        const sum = this.prev.reduce((a, b) => a + b, 0);
        const avg = (sum / this.prev.length) || 0;
        // console.log(avg, this.prev);
        // this.mesh.position.y -= avg
        this.mesh.position.y = THREE.MathUtils.lerp(this.mesh.position.y, this.mesh.position.y - avg, .5)

    }
    stop() {
        loopMachine.removeCallback(this.tick)
    }
}

const rayLander = new RayLander()

export default rayLander