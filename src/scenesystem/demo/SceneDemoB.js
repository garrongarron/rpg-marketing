import camera from "../../basic/Camera.js"
import light from "../../basic/Light.js"
import loopMachine from "../../basic/LoopMachine.js"
import fireController from "../../basic/particles/ParticleSystemDemo.js"
import renderer from "../../basic/Renderer.js"
import resize from "../../basic/Resize.js"
import scene from "../../basic/Scene.js"
import godot from "../../character/dragon/Godot.js"
import cube from "../../shapes/Cube.js"
import MasterScene from "../MasterScene.js"

class SceneDemoB extends MasterScene {
    open() {
        scene.add(light)
        camera.position.set(0, 10, 10)

        // cube.scale.set(0.01,0.01,0.01)

        resize.start(renderer)
        loopMachine.addCallback(() => {
            // cube.rotation.y += 0.01 
            // if (this.mesh)
            //     this.mesh.rotation.y += 0.01
            renderer.render(scene, camera)
        })
        loopMachine.start()
        godot.then(mesh => {
            this.mesh = mesh
            cube.material.color = new THREE.Color(0x00FF00)
            cube.position.set(0, 2.55, 2)
            mesh.attach(cube)
            scene.add(mesh)
            camera.lookAt(mesh.position)
            setInterval(() => {
                this.fire()
            }, 1000*10);
            this.fire()
        })
    }
    fire(){
        let direction1 = new THREE.Vector3(0, 0, 5)
        let direction2 = new THREE.Vector3(0, 0, 15)
        fireController.start(fireController.params.smoke, direction1, cube)
        fireController.start(fireController.params.fire, direction2, cube)
    }
    close() {
        loopMachine.clean()
        console.log(`the Scene ${this.instanceName} is clossing`);
    }
}

const sceneDemoB = new SceneDemoB()

export default sceneDemoB