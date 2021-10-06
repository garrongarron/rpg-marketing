import camera from "../basic/Camera.js"
import moveController from "../basic/controllers/MoveController.js"
import loopMachine from "../basic/LoopMachine.js"
import renderer from "../basic/Renderer.js"
import resize from "../basic/Resize.js"
import scene from "../basic/Scene.js"
import MasterScene from "../scenesystem/MasterScene.js"
import warrior from "../character/warrior/Warrior.js"
import rayLander from "../basic/controllers/RayLander.js"
import characterControllerZAxes from "../basic/controllers/CharacterControllerZAxes.js"
import tutorialGame from "./tutorial/TutorialGame.js"
import peasantController from "../basic/controllers/PeasantController.js"
import soundHandler from "../basic/sound/SoundHandler.js"
import environementHandler from "./environment/EnvironmentHandler.js"
import castleguardController from "../basic/controllers/CastleguardController.js"


class Tutorial extends MasterScene {
    constructor() {
        super()
        this.mesh = null
        this.vol = 1
    }
    open() {
        resize.start(renderer)
        loopMachine.addCallback(() => {
            renderer.render(scene, camera)
        })
        loopMachine.start()
        camera.position.set(0, 0, 5)
        warrior.then(mesh => {
            this.mesh = mesh
            this.mesh.rotation.y = Math.PI
            scene.add(mesh)
            setTimeout(() => {
                mesh.position.set(-3, 0, 32)
                // mesh.position.set(-3, 2, 5)
                camera.position.set(0, 0, 5)
                moveController.start(mesh)
                rayLander.start(mesh, 0)
            }, 1000);

            characterControllerZAxes.start(mesh)
            peasantController.start(mesh)
            castleguardController.start(mesh)
            environementHandler.start(mesh)
            environementHandler.night()
        })
        tutorialGame.start()
        loopMachine.addCallback(this.musicFadeOut)
    }
    musicFadeOut = () => {
        this.vol -= 0.01
        if (this.vol > .2) {
            soundHandler.setVolume('epic', this.vol)
        }
        if (this.vol < 0) {
            soundHandler.stop('fire')
            loopMachine.removeCallback(this.musicFadeOut)
        }
        soundHandler.setVolume('fire', (this.vol > 0) ? this.vol : 0)
    }
    close() {
        console.log(`the Scene ${this.instanceName} is clossing`);
        loopMachine.clean()
    }
}

const tutorial = new Tutorial()

export default tutorial