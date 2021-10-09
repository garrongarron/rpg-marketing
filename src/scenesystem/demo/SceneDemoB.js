import sign from "../../basic/buildings/Sign.js"
import camera from "../../basic/Camera.js"
import flagContainer from "../../basic/environment/cloth/FlagContainer.js"
import keyCode from "../../basic/KeyCode.js"
import keyListener from "../../basic/KeyListener.js"
import light from "../../basic/Light.js"
import loopMachine from "../../basic/LoopMachine.js"
import renderer from "../../basic/Renderer.js"
import resize from "../../basic/Resize.js"
import scene from "../../basic/Scene.js"
import createRigidBody from "../../physics/CreateRigidBody.js"
import addGround from "../../physics/Ground.js"
import initPhysics from "../../physics/InitPhysics.js"
import addPhysicBox from "../../physics/PhysicBox.js"
import rigidBodies from "../../physics/RigidBodies.js"
import updatePhysics from "../../physics/UpdatePhysics.js"
import cube from "../../shapes/Cube.js"
import MasterScene from "../MasterScene.js"

class SceneDemoA extends MasterScene {
    open() {
        scene.add(light)
        scene.add(cube)
        cube.material.color = new THREE.Color(0x00FF00)
        camera.position.set(0, 2, 4)

        resize.start(renderer)
        loopMachine.addCallback(() => {

            camera.lookAt(cube.position)

            renderer.render(scene, camera)
        })
        loopMachine.start()
        
    }
    close() {
        loopMachine.clean()
        console.log(`the Scene ${this.instanceName} is clossing`);
    }
}

const sceneDemoA = new SceneDemoA()

export default sceneDemoA