import camera from "../../basic/Camera.js"
import light from "../../basic/Light.js"
import loopMachine from "../../basic/LoopMachine.js"
import renderer from "../../basic/Renderer.js"
import resize from "../../basic/Resize.js"
import scene from "../../basic/Scene.js"
import cube from "../../shapes/Cube.js"
import InstructionContainer from "../../UI/compoment/InstructionContainer.js"
import weel from "../../UI/compoment/Weel.js"
import MasterScene from "../MasterScene.js"

class SceneDemoB extends MasterScene {
    open() {
        scene.add(light)
        scene.add(cube)
        cube.material.color = new THREE.Color(0x001100)
        camera.position.set(1, 2, 3)
        camera.lookAt(cube.position)
        resize.start(renderer)
        loopMachine.addCallback(() => {
            cube.rotation.y += 0.01
            renderer.render(scene, camera)
        })
        loopMachine.start()
        let content = new InstructionContainer();
        content.querySelector('body')
        
    }
    close() {
        loopMachine.clean()
        console.log(`the Scene ${this.instanceName} is clossing`);
    }
}

const sceneDemoB = new SceneDemoB()

export default sceneDemoB