import camera from "../basic/Camera.js"
import loopMachine from "../basic/LoopMachine.js"
import renderer from "../basic/Renderer.js"
import resize from "../basic/Resize.js"
import scene from "../basic/Scene.js"
import MasterScene from "../scenesystem/MasterScene.js"
import warrior from "../character/warrior/Warrior.js"
import soundHandler from "../basic/sound/SoundHandler.js"
import environementHandler from "./environment/EnvironmentHandler.js"
import tutorialCharacterController from "../basic/controllers/CharacterController/TutorialCharacterController.js"
import cameraComponent from "../basic/controllers/CharacterController/components/CameraComponent.js"
import tutorialGame from "./tutorialscene/TutorialGame.js"
import castleguard from "../character/castleguard/CastleGuar.js"
import peasant from "../character/peasant/Peasant.js"


class TutorialScene extends MasterScene {
    constructor() {
        super()
        this.mesh = null
        this.vol = 1
    }
    tick = () => {
        renderer.render(scene, camera)
    }
    open() {
        resize.start(renderer)
        loopMachine.addCallback(this.tick)
        loopMachine.start()
        warrior.then(mesh => {
            window.mesh = mesh.position
            mesh.position.set(
                -3,
                0,
                32)
            mesh.name = "warrior"
            mesh.rotation.y = Math.PI
            // camera.lookAt(mesh.position)

            tutorialCharacterController.addComponents(cameraComponent)
            environementHandler.start(mesh)
            environementHandler.night()
            tutorialGame.start()
            tutorialCharacterController.start()
        })

        loopMachine.addCallback(this.musicFadeOut)
        if (!soundHandler.isPlaying('epic')) {
            soundHandler.setVolume('epic', .2)
            soundHandler.setAsLoop('epic')
            soundHandler.play('epic')
        }

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
        environementHandler.stop()
        console.log(`the Scene ${this.instanceName} is clossing`);
        loopMachine.removeCallback(this.tick)
    }
}

const tutorialScene = new TutorialScene()

export default tutorialScene