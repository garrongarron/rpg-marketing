import camera from "../../basic/Camera.js"
import light from "../../basic/Light.js"
import loopMachine from "../../basic/LoopMachine.js"
import renderer from "../../basic/Renderer.js"
import resize from "../../basic/Resize.js"
import scene from "../../basic/Scene.js"
import cube from "../../shapes/Cube.js"
import MasterScene from "../MasterScene.js"

class SceneDemoB extends MasterScene {
    open() {
        scene.add(light)
        scene.add(cube)
        cube.material.color = new THREE.Color(0x00FF00)
        camera.position.set(1, 2, 3)
        camera.lookAt(cube.position)
        resize.start(renderer)
        loopMachine.addCallback(() => {
            cube.rotation.y += 0.01 
            renderer.render(scene, camera)
        })
        loopMachine.start()
        // const raycaster = new THREE.Raycaster(
        //     new THREE.Vector3(0, 10, 0),
        //     new THREE.Vector3(0, -1, 0),//sould be normalize
        //     0,
        //     20
        // );
        // const intersects = raycaster.intersectObjects(scene.children);
        // if(intersects.length >0){
        //     intersects[0].object.material.color.set(0xff0000);
        //     // console.log(intersects[0]);
        // }
    }
    close() {
        loopMachine.clean()
        console.log(`the Scene ${this.instanceName} is clossing`);
    }
}

const sceneDemoB = new SceneDemoB()

export default sceneDemoB