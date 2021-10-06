import Animator from "../../basic/Animator.js"
import camera from "../../basic/Camera.js"
import light from "../../basic/Light.js"
import loopMachine from "../../basic/LoopMachine.js"
import renderer from "../../basic/Renderer.js"
import resize from "../../basic/Resize.js"
import scene from "../../basic/Scene.js"
import warrior from "../../character/warrior/Warrior.js"
import cube from "../../shapes/Cube.js"
import MasterScene from "../MasterScene.js"

class SceneDemoB extends MasterScene {
    open() {
        scene.add(light)
        scene.add(cube)
        cube.material.color = new THREE.Color(0x00FF00)
        camera.position.set(50, 5, 0)

        resize.start(renderer)

        loopMachine.start()
        warrior.then(mesh => {
            scene.add(mesh)
            this.mesh = mesh
            this.animator = new Animator(mesh)
            this.animator.action(5, 1, true)
            this.animator.whenAnimationEnd(() => {
                console.log(
                    'Bone\n' + JSON.stringify(mesh.children[4].children[0].position) +
                    '\nPosition\n' + JSON.stringify(mesh.position))

                // alert()
                mesh.position.z += mesh.children[4].children[0].position.z / 100
                mesh.position.x += mesh.children[4].children[0].position.x / 100

            })
            this.animator.start()
            loopMachine.addCallback(() => {
                cube.rotation.y += 0.01
                let pos = mesh.position.clone().add(mesh.up)
                pos.z += mesh.children[4].children[0].position.z / 100
                pos.x += mesh.children[4].children[0].position.x / 100
                camera.lookAt(pos)
                renderer.render(scene, camera)
            })

        })
    }
    close() {
        loopMachine.clean()
        console.log(`the Scene ${this.instanceName} is clossing`);
    }
}

const sceneDemoB = new SceneDemoB()

export default sceneDemoB