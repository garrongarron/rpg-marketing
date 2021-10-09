import eventBus from "./EventBus.js";
import loopMachine from "./LoopMachine.js"
import scene from "./Scene.js";

class CollisionSystem {
    constructor() {
        this.containers = []
        this.target = null
        this.targetBox = new THREE.Box3();
        eventBus.subscribe('collision', this.collision)
        this.callback = null
    }
    removeElement(mesh) {
        let index = this.containers.indexOf(mesh)
        if (index > -1) this.containers.splice(index, 1)
    }
    collision = (mesh) => {
        if (this.callback) {
            this.callback(mesh)
        }
    }
    addCallback(callback) {
        this.callback = callback
    }
    addElement(mesh) {
        let container = new THREE.Box3();
        container.setFromObject(mesh)
        mesh.userData.box3 = container
        this.containers.push(mesh)
    }
    start(target) {
        this.target = target
        // const helper = new THREE.Box3Helper(this.targetBox, 0xffff00);
        // scene.add(helper);
        loopMachine.addCallback(this.run)
    }
    stop() {
        loopMachine.removeCallback(this.run)
    }
    run = () => {
        this.targetBox.setFromObject(this.target)
        this.containers.forEach(mesh => {
            if (mesh.userData.box3.intersectsBox(this.targetBox)) {
                eventBus.dispatch('collision', mesh)
                return
            }
        })

    }
}

const collisionSistem = new CollisionSystem()

export default collisionSistem