import headquarter from "../../basic/buildings/Headquarter.js"
import scene from "../../basic/Scene.js"
import params from "../../basic/terrain/Params.js"

class HeadquarterHandler{
    constructor(){}
    start(){
        let pos = { x: 0, y: 20, z: -354 }
        params.filters = (x, y, out) => {
            let internalRadio = 150
            let externalRadio = 60
            let levelY = pos.y - 3
            //
            let a = new THREE.Vector2(x, y)
            let b = new THREE.Vector2(pos.x, -pos.z)
            let distance = a.distanceTo(b)
            if (distance < internalRadio) {
                let val = (distance - externalRadio) / (internalRadio - externalRadio)
                let lerp = THREE.MathUtils.clamp(val, 0, 1)
                return THREE.MathUtils.lerp(levelY, out, lerp)
            }
            return out
        }
        headquarter.then(mesh => {
            scene.add(mesh)
            this.mesh = mesh
            mesh.name = "castle"
            window.scene = scene
            mesh.layers.enable( 1 );
            mesh.position.set(pos.x, pos.y, pos.z)
        })
    }
    stop(){}
}

const headquarterHandler = new HeadquarterHandler()

export default headquarterHandler