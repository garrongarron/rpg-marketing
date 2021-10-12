import headquarter from "../../basic/buildings/Headquarter.js"
import scene from "../../basic/Scene.js"
import params from "../../basic/terrain/Params.js"
import '../../basic/terrain/Filters.js'
class HeadquarterHandler{
    constructor(){}
    start(){
        let pos = { x: 0, y: 20, z: -354 }
        headquarter.then(mesh => {
            scene.add(mesh)
            this.mesh = mesh
            mesh.name = "castle"
            window.scene = scene
            // mesh.layers.enable( 1 );
            mesh.position.set(pos.x, pos.y, pos.z)
        })
    }
    stop(){}
}

const headquarterHandler = new HeadquarterHandler()

export default headquarterHandler