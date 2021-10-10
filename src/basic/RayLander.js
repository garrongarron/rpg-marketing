import loopMachine from "./LoopMachine.js";
import scene from "./Scene.js";
alert('no')
class RayLander {
    constructor() {
        this.raycaster = new THREE.Raycaster();
        // this.raycaster.layers.set(1);
        this.mesh = null
        this.distanceToGround = null
    }
    start(mesh, distanceToGround = .5) {
        this.mesh = mesh
        this.distanceToGround = distanceToGround
        loopMachine.addCallback(this.tick.bind(this))
    }
    tick(){
        this.raycaster.set(this.mesh.position, this.mesh.up.negate().normalize())
        const intersected = this.raycaster.intersectObjects( scene.children, true )[0];
        if(intersected){
            this.mesh.position.y -= intersected.distance - this.distanceToGround 
        }
    }
    stop() { 
        loopMachine.removeCallback(this.tick.bind(this))
    }
}

const rayLander = new RayLander()

export default rayLander