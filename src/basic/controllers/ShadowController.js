import loopMachine from "../LoopMachine.js"
import scene from "../Scene.js"


class ShadowController {
    constructor() {
        this.mesh = null
        this.directionalLight = null
        this.pointLight = null
        this.n = 0
    }
    start(mesh, directionalLight, offset) {
        this.mesh = mesh
        this.directionalLight = directionalLight.children[0]
        // this.pointLight = directionalLight.children[1]//pint
        this.offset = offset
        this.n = setInterval(this.run, 1000*5);
        scene.add( this.directionalLight.target );
    }
    stop() {
        clearInterval(this.n)
    }
    run = () => {
        this.directionalLight.target.position.copy(this.mesh.position)
        this.directionalLight.position.set(
            this.mesh.position.x + this.offset.x,
            this.mesh.position.y + this.offset.y,
            this.mesh.position.z + this.offset.z
        )

        // this.pointLight.position.set(
        //     this.mesh.position.x,
        //     this.mesh.position.y +5,
        //     this.mesh.position.z
        // )
    }
}

const shadowController = new ShadowController()

export default shadowController