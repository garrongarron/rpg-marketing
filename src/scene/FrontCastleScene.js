import camera from "../basic/Camera.js"
import { CameraComponent } from "../basic/controllers/CharacterController/components/CameraComponent.js"
import rotationComponent from "../basic/controllers/CharacterController/components/RotationComponent.js"
import tutorialCharacterController from "../basic/controllers/CharacterController/TutorialCharacterController.js"
import orbitImplementation from "../basic/controllers/OrbitImplementation.js"
import loopMachine from "../basic/LoopMachine.js"
import renderer from "../basic/Renderer.js"
import rayLander from "../basic/controllers/RayLander.js"
import resize from "../basic/Resize.js"
import scene from "../basic/Scene.js"
import warrior from "../character/warrior/Warrior.js"
import MasterScene from "../scenesystem/MasterScene.js"
import environementHandler from "./environment/EnvironmentHandler.js"
import compass from "./frontcastle/Compass.js"
import flagHandler from "./frontcastle/FlagHandler.js"
import headquarterHandler from "./frontcastle/HeadquarterHandler.js"
import godotController from "../basic/controllers/GodotController.js"
import soundHandler from "../basic/sound/SoundHandler.js"
import { GravityComponent } from "../basic/controllers/CharacterController/components/GravityController.js"
import inventory from "../basic/inventory/Inventory.js"
import feedingSystem from "./FeedingSystem.js"
import godot from "../character/dragon/Godot.js"
import kingController from "./frontcastle/KingController.js"
import ending from "./frontcastle/Ending.js"
import { MovementComponent } from "../basic/controllers/CharacterController/components/MovementComponent.js"
import fadeInBlack from "../UI/FadeInBlack.js"
import king from "../character/king/King.js"
import headquarter from "../basic/buildings/Headquarter.js"

class FrontCastleScene extends MasterScene {
    open() {
        resize.start(renderer)
        loopMachine.addCallback(this.tick)
        loopMachine.start()
        inventory.start()
        headquarterHandler.start()

        flagHandler.start()
        tutorialCharacterController.removeComponentByClass(CameraComponent)
        tutorialCharacterController.addComponents(rotationComponent)
        rotationComponent.start()
        tutorialCharacterController.removeComponentByClass(GravityComponent)
        tutorialCharacterController.startComponent(MovementComponent)
        warrior.then(mesh => {
            this.warrior = mesh
            ending.start(this.warrior)//listener
            if (mesh.position.y == 0) {
                mesh.position.set(0, 3, 0)
                mesh.rotation.y = Math.PI
                camera.position.set(0, 10, 20)

                // let pos = { x: 0, y: 17, z: -354 + 40 }
                // let pos = {
                //     x: 0,
                //     y: 7.593922879090872 ,
                //     z: -163,
                // }
                // mesh.position.copy(pos)
                // camera.position.copy(pos)
            }
            camera.position.set(0, 10, 20)
            environementHandler.start(mesh)
            environementHandler.night()
            compass.start(mesh)
            rayLander.start(mesh, 0)
            godotController.start(mesh)
            godot.then(mesh => {
                feedingSystem.start(mesh)
            })
        })
        Promise.all([king, godot, warrior, headquarter]).then(() => {
            setTimeout(() => {
                orbitImplementation.start(this.warrior)
                fadeInBlack.stop()
                tutorialCharacterController.start()
                tutorialCharacterController.loop.start()
            }, 1000);
        })
        kingController.start()
        if (!soundHandler.isPlaying('epic')) {
            soundHandler.setVolume('epic', .2)
            soundHandler.setAsLoop('epic')
            soundHandler.play('epic')
        }
    }
    tick = () => {
        renderer.render(scene, camera)
    }
    close() { }
}

const frontCastleScene = new FrontCastleScene()

export default frontCastleScene