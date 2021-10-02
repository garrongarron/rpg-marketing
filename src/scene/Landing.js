import camera from "../basic/Camera.js"
import light from "../basic/Light.js"
import loopMachine from "../basic/LoopMachine.js"
import renderer from "../basic/Renderer.js"
import resize from "../basic/Resize.js"
import scene from "../basic/Scene.js"
import MasterScene from "../scenesystem/MasterScene.js"
import fire from "../fx/Fire.js"
import warrior from "../character/warrior/Warrior.js"
import soundHandler from "../basic/sound/SoundHandler.js"
import playnow from "../UI/PlayNow.js"
import Animator from "../basic/Animator.js"
import story from "../UI/Story.js"

class Landing extends MasterScene {
    open() {
        scene.add(light)
        camera.position.set(0, 1.5, 1.5)
        const cameraTarget = new THREE.Object3D()
        cameraTarget.position.set(0, 5, -3)
        camera.lookAt(cameraTarget.position)
        resize.start(renderer)
        let clock = new THREE.Clock();
        let delta = 0
        loopMachine.addCallback(() => {
            renderer.render(scene, camera)
            delta = clock.getDelta();
        })

        let down = () => {
            cameraTarget.position.y -= 0.2 * delta
            if (cameraTarget.position.y < 1.3) {
                loopMachine.removeCallback(down)
            }
            camera.lookAt(cameraTarget.position)
        }
        fire.start()
        warrior.then(mesh => {
            this.mesh= mesh
            soundHandler.setVolume('fire', .2)
            playnow.getPlayNowModule().querySelector('.beating1').addEventListener('click', () => {
                soundHandler.play('epic')
                soundHandler.play('fire')
                playnow.fadeout()
                setTimeout(() => {
                    story.start()
                }, 3000);
                loopMachine.addCallback(down)
                let rotation = () => {
                    mesh.rotation.y += 0.5 * delta
                    if (mesh.rotation.y > Math.PI * 2 + .2) {
                        loopMachine.removeCallback(rotation)
                    }
                }
                loopMachine.addCallback(rotation)
            })
            scene.add(mesh)
            let animator = new Animator(mesh)
            animator.action(0, 1, false)
            animator.start()
        })
        loopMachine.start()
    }
    close() {
        loopMachine.clean()
        fire.stop()
        let a = document.createElement('div')
        a.appendChild(playnow.getPlayNowModule())
        scene.remove(this.mesh)
        console.log(`the Scene ${this.instanceName} is clossing`);
    }
}

const landing = new Landing()

export default landing