import collisionSistem from "../basic/CollisionSystem.js"
import inventory from "../basic/inventory/Inventory.js"
import loopMachine from "../basic/LoopMachine.js"
import scene from "../basic/Scene.js"
import soundHandler from "../basic/sound/SoundHandler.js"
import params from "../basic/terrain/Params.js"
import warrior from "../character/warrior/Warrior.js"
// import cube from "../shapes/Cube.js"

class FeedingSystem {
    constructor() {
        this.radio = 15
        this.quantity = 5
        this.target = null
    }
    start(target) {
        this.target = target
        let diameter = .25
        const geometry = new THREE.CylinderGeometry(diameter, diameter, diameter * .3, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const cube = new THREE.Mesh(geometry, material);
        cube.rotation.x = Math.PI * .5
        for (let index = 0; index < this.quantity; index++) {
            let apple = cube.clone()
            apple.rotation.z = Math.PI * Math.random()
            apple.userData.rotateCallback = () => {
                apple.rotation.z += .1 
            }
            loopMachine.addCallback(apple.userData.rotateCallback)
            let x = Math.random() * this.radio * 2 - this.radio + this.target.position.x
            let z = Math.random() * this.radio * 2 - this.radio + this.target.position.z
            let y = params.customNoiseGenerator(x, -z) + .5
            apple.position.set(x, y, z)
            scene.add(apple)
            collisionSistem.addElement(apple)
        }
        
        
        collisionSistem.addCallback((mesh) => {
            soundHandler.play('plim')
            collisionSistem.removeElement(mesh)
            loopMachine.removeCallback(mesh.userData.rotateCallback)
            scene.remove(mesh)
            inventory.addItem(1, inventory.types.gold)
        })
        warrior.then(mesh => {
            collisionSistem.start(mesh)
            // mesh.position.copy(this.target.position)
        })
    }
    stop() {
        collisionSistem.stop()
    }
}

const feedingSystem = new FeedingSystem()

export default feedingSystem