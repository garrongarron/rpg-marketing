import sign from "../../basic/buildings/Sign.js"
import camera from "../../basic/Camera.js"
import { AnimationComponent } from "../../basic/controllers/CharacterController/components/AnimationComponent.js"
import tutorialCharacterController from "../../basic/controllers/CharacterController/TutorialCharacterController.js"
import flagContainer from "../../basic/environment/cloth/FlagContainer.js"
import eventBus from "../../basic/EventBus.js"
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
import flagHandler from "../../scene/frontcastle/FlagHandler.js"
import cube from "../../shapes/Cube.js"
import MasterScene from "../MasterScene.js"

class SceneDemoA extends MasterScene {
    open() {
        scene.add(light)
        scene.add(cube)
        cube.material.color = new THREE.Color(0x00FF00)
        camera.position.set(10, 0, 0)

        resize.start(renderer)
        loopMachine.addCallback(() => {

            camera.lookAt(cube.position)

            renderer.render(scene, camera)
        })
        loopMachine.start()
        tutorialCharacterController.start()
        keyListener.start()
        let caster = (data) => {
            eventBus.dispatch('keyListener', data)
        }
        keyListener.setCaster(caster)
        let anim = tutorialCharacterController.getComponentByClass(AnimationComponent)
        
        window.addEventListener('click', () => {
            anim.animator.action(anim.animations.attack, 1, true)
            anim.animator.whenAnimationEnd(this.move)
        })
        // flagHandler.start()
    }
    move = () => {
        this.warrior = tutorialCharacterController.state.mesh
        let z = this.warrior.children[4].children[0].position.z / 100
        let x = this.warrior.children[4].children[0].position.x / 100
        const vec2 = new THREE.Vector2(x, z);
        vec2.rotateAround(new THREE.Vector2(), -this.warrior.rotation.y)
        this.warrior.position.z += vec2.y
        this.warrior.position.x += vec2.x
        // this.warrior.rotation.y += 50 * Math.PI / 180
    }
    close() {
        loopMachine.clean()
        console.log(`the Scene ${this.instanceName} is clossing`);
    }
}

const sceneDemoA = new SceneDemoA()

export default sceneDemoA