// import loopMachine from "./LoopMachine.js"

// class ShadowController {
//     constructor() {
//         this.mesh = null
//         this.directionalLight = null
//     }
//     start(mesh, directionalLight, offset) {
//         this.mesh = mesh
//         this.directionalLight = directionalLight
//         this.directionalLight.target = this.mesh
//         this.offset = offset
//         loopMachine.addCallback(this.run.bind(this))
//     }
//     stop() {
//         loopMachine.removeCallback(this.run.bind(this))
//     }
//     run() {
//         this.directionalLight.position.set(
//             this.mesh.position.x + this.offset.x,
//             this.mesh.position.y + this.offset.y,
//             this.mesh.position.z + this.offset.z,
//         )
//     }
// }

// const shadowController = new ShadowController()

// export default shadowController