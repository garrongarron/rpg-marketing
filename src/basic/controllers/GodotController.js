import godot from "../../character/dragon/Godot.js"
import environementHandler from "../../scene/environment/EnvironmentHandler.js"
import feedingSystem from "../../scene/FeedingSystem.js"
import cube from "../../shapes/Cube.js"
import loopMachine from "../LoopMachine.js"
import fireController from "../particles/ParticleSystemDemo.js"
import scene from "../Scene.js"

class GodotController {
    constructor() {
        this.target = null
        this.day = false
    }
    start(target) {
        this.target = target
        godot.then(mesh => {
            this.godot = mesh
            scene.add(mesh)
            let pos = {
                x: 9.35554280260959,
                y: 1.1562213741056473,
                z: -120.90295582921397
            }
            cube.material.color = new THREE.Color(0x00FF00)
            cube.position.set(0, 2.55, 2)
            // cube.visible = false
            cube.material.opacity = 0
            cube.material.transparent = true
            mesh.attach(cube)
            mesh.rotation.y = Math.PI * .98
            mesh.position.set(pos.x, pos.y, pos.z)
            // this.target.position.copy(mesh.position)
            feedingSystem.start(mesh)
            setInterval(() => {
                this.fire()
            }, 1000 * 10);
            this.fire()
        })
        loopMachine.addCallback(this.run)
    }
    fire() {
        let direction1 = new THREE.Vector3(0, 0, 5)
        let direction2 = new THREE.Vector3(0, 0, 15)
        fireController.start(fireController.params.smoke, direction1, cube)
        fireController.start(fireController.params.fire, direction2, cube)
    }
    stop() {
        loopMachine.removeCallback(this.run)
        scene.remove(this.godot)
    }
    run = () => {
        if (this.target && this.godot) {
            let pos = this.target.position.clone()
            pos.y = this.godot.position.y
            this.godot.lookAt(pos)
            
            //Aim to the warrior
            let warriorPos = this.target.position.clone()
            warriorPos.y += 1
            cube.lookAt(warriorPos)
        }
    }
}

const godotController = new GodotController()

export default godotController