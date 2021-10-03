import camera from "../../basic/Camera.js"
import moveController from "../../basic/controllers/MoveController.js"
import orbitImplementation from "../../basic/controllers/OrbitImplementation.js"
import ratationController from "../../basic/controllers/RotationController.js"
import terrainController from "../../basic/controllers/TarrainController.js"
import keyListener from "../../basic/KeyListener.js"
import light from "../../basic/Light.js"
import loopMachine from "../../basic/LoopMachine.js"
import renderer from "../../basic/Renderer.js"
import resize from "../../basic/Resize.js"
import scene from "../../basic/Scene.js"
import terrain from "../../basic/terrain/Terrain.js"
import cube from "../../shapes/Cube.js"
import MasterScene from "../MasterScene.js"


class SceneDemoB extends MasterScene {
    open() {
        scene.add(light)
        scene.add(cube)
        cube.position.y = 10
        cube.material.color = new THREE.Color(0x0000FF)
        camera.position.set(0, 5, 10)

        resize.start(renderer)
        loopMachine.addCallback(() => {
            camera.lookAt(cube.position)
            renderer.render(scene, camera)
        })
        loopMachine.start()
        terrain.start(scene)
        moveController.start(cube)
        ratationController.start(cube)
        terrainController.start(cube, terrain)
        orbitImplementation.start(cube)
        keyListener.start()
    }
    close() {
        console.log(`the Scene ${this.instanceName} is clossing`);
        loopMachine.clean()
    }
}

const sceneDemoB = new SceneDemoB()

export default sceneDemoB