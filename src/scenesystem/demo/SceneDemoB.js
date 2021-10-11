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
        // scene.add(cube)
        // cube.material.color = new THREE.Color(0x00FF00)
        camera.position.set(10,10,10)
        
        resize.start(renderer)


        let diameter = .5
        const geometry = new THREE.CylinderGeometry(diameter, diameter, diameter*.3, 8);
        const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
        const cylinder = new THREE.Mesh(geometry, material);
        scene.add(cylinder);
        console.log();

        loopMachine.addCallback(() => {
            // cube.rotation.y += 0.01
            camera.lookAt(cylinder.position)
            renderer.render(scene, camera)
        })
        loopMachine.start()
        
    }
    close() {
        loopMachine.clean()
        console.log(`the Scene ${this.instanceName} is clossing`);
    }
}

const sceneDemoB = new SceneDemoB()

export default sceneDemoB