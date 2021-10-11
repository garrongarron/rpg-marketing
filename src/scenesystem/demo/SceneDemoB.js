import Animator from "../../basic/Animator.js"
import camera from "../../basic/Camera.js"
import light from "../../basic/Light.js"
import loopMachine from "../../basic/LoopMachine.js"
import renderer from "../../basic/Renderer.js"
import resize from "../../basic/Resize.js"
import scene from "../../basic/Scene.js"
import king from "../../character/king/King.js"
import cube from "../../shapes/Cube.js"
import MasterScene from "../MasterScene.js"

class SceneDemoA extends MasterScene {
    open() {
        scene.add(light)
        // scene.add(cube)
        cube.material.color = new THREE.Color(0x00FF00)
        camera.position.set(0, 2, 5)

        resize.start(renderer)
        loopMachine.addCallback(() => {
            // cube.rotation.y += 0.01 
            renderer.render(scene, camera)
        })
        loopMachine.start()
        king.then(mesh => {
            scene.add(mesh)
            camera.lookAt(mesh.position.clone().add(mesh.up))

            this.anim = new Animator(mesh)
            this.anim.clips[4] = THREE.AnimationUtils.subclip(this.anim.clips[2]._clip, 'die', 60, 100000, 30)
            this.anim.clips[4] = this.anim.mixer.clipAction(this.anim.clips[4])
            this.anim.clips[4].clampWhenFinished = true
            this.anim.action(0, 1, false)
            this.anim.start()
            setTimeout(() => {
                this.acting()
            }, 5000);
        })
    }
    acting(){
        setTimeout(() => {
            this.anim.action(2, 1, false)
        }, 4000);
        setTimeout(() => {
            // this.anim.clips[this.anim.lastClip].weight = 0
            this.anim.action(3, 1, false)
        }, 6000);
        setTimeout(() => {
            this.anim.action(4, 1, true)
            this.anim.clips[4].repetitions = 1
            this.anim.whenAnimationEnd(() => { this.anim.stop })
        }, 8000);
    }
    close() {
        loopMachine.clean()
        console.log(`the Scene ${this.instanceName} is clossing`);
    }
}

const sceneDemoA = new SceneDemoA()

export default sceneDemoA