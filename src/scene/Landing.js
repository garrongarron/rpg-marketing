import camera from "../basic/Camera.js"
import light from "../basic/Light.js"
import loopMachine from "../basic/LoopMachine.js"
import renderer from "../basic/Renderer.js"
import resize from "../basic/Resize.js"
import scene from "../basic/Scene.js"
import MasterScene from "../scenesystem/MasterScene.js"
import fire from "../fx/Fire.js"
import warrior from "../character/warrior/Warrior.js"
// import soundHandler from "../basic/sound/SoundHandler.js"
import Animator from "../basic/Animator.js"
import eventBus from "../basic/EventBus.js"
import PlayNow from "../UI/compoment/PlayNow.js"

class Landing extends MasterScene {
    constructor() {
        super()
        this.cameraTarget = new THREE.Object3D()
        this.mesh = null
        this.delta = 0
        this.playNow = new PlayNow()
    }
    down() {
        let callback = () => {
            this.cameraTarget.position.y -= 0.2 * this.delta
            if (this.cameraTarget.position.y < 1.3) {
                loopMachine.removeCallback(callback)
            }
            camera.lookAt(this.cameraTarget.position)
        }
        loopMachine.addCallback(callback)
    }
    rotation() {
        this.mesh.rotation.y += 0.5 * this.delta
        if (this.mesh.rotation.y > Math.PI * 2 + .2) {
            loopMachine.removeCallback(rotation)
        }
    }
    open() {
        document.body.style.backgroundImage = 'linear-gradient(black, rgb(151, 56, 56))'
        document.body.style.backgroundColor = 'black'
        scene.add(light)
        camera.position.set(0, 1.5, 1.5)

        this.cameraTarget.position.set(0, 5, -3)
        camera.lookAt(this.cameraTarget.position)
        resize.start(renderer)
        let clock = new THREE.Clock();
        loopMachine.addCallback(() => {
            renderer.render(scene, camera)
            this.delta = clock.getDelta();
        })
        fire.start()

        setTimeout(() => { this.playNow.querySelector('body') }, 100);
        warrior.then(mesh => {
            this.mesh = mesh
            scene.add(mesh)
            let animator = new Animator(mesh)
            animator.action(0, 1, false)
            animator.start()
            eventBus.dispatch('characterLoaded', this)
        })
        loopMachine.start()
    }
    close() {
        loopMachine.clean()
        fire.stop()
        this.playNow.drop()
        scene.remove(this.mesh)
        console.log(`the Scene ${this.instanceName} is clossing`);
    }
}

const landing = new Landing()

export default landing