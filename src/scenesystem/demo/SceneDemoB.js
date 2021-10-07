import camera from "../../basic/Camera.js"
import light from "../../basic/Light.js"
import loopMachine from "../../basic/LoopMachine.js"
import fireController from "../../basic/particles/ParticleSystemDemo.js"
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
        camera.position.set(0,12,25)
        camera.lookAt(cube.position)
        resize.start(renderer)
        loopMachine.addCallback(() => {
            cube.rotation.y += 0.01 
            renderer.render(scene, camera)
        })
        loopMachine.start()
        let direction = new THREE.Vector3(5,0,0)
        fireController.start(fireController.params.smoke, direction)
        fireController.start(fireController.params.fire, direction)
    }
    close() {
        loopMachine.clean()
        console.log(`the Scene ${this.instanceName} is clossing`);
    }
}

const sceneDemoB = new SceneDemoB()

export default sceneDemoB