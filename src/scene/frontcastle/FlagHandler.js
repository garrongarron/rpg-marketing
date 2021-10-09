import sign from "../../basic/buildings/Sign.js";
import flagContainer from "../../basic/environment/cloth/FlagContainer.js";
import scene from "../../basic/Scene.js";

class FlagHandler{
    constructor(){}
    start(){
        let pos = {
            x: 0,
            y: 7.593922879090872 +2,
            z: -169.14640000002728,
        }
        flagContainer.start(pos)

        const spotLight = new THREE.PointLight(0xffffaa, 1, 10);
        spotLight.position.set(pos.x-2, pos.y + 3, pos.z - 3);
        scene.add(spotLight);
        let obj = new THREE.Object3D()
        obj.position.set(pos.x, pos.y, pos.z)
        spotLight.target = obj
        scene.add(spotLight.target)
        // this.mesh.position.copy(pos)
        let url = 'src/basic/buildings/Signs/alva.png'
        pos = JSON.parse(JSON.stringify(pos))
        pos.z -=5
        pos.x -=5
        pos.y -=1.5
        sign.start(url, pos,{x:0,y:Math.PI*.0,z:0})
    }
    stop(){}
}

const flagHandler = new FlagHandler()

export default flagHandler