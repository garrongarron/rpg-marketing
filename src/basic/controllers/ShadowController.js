import loopMachine from "../LoopMachine.js"


class ShadowController {
    constructor() {
        this.mesh = null
        this.directionalLight = null
        this.pointLight = null
    }
    start(mesh, directionalLight, offset) {
        this.mesh = mesh
        this.directionalLight = directionalLight.children[0]
        // this.pointLight = directionalLight.children[1]//pint
        this.directionalLight.target = this.mesh
        this.offset = offset
        loopMachine.addCallback(this.run)
    }
    stop() {
        loopMachine.removeCallback(this.run)
    }
    run = () => {
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