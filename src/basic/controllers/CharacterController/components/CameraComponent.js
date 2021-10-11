import camera from "../../../Camera.js"
import eventBus from "../../../EventBus.js"
import params from "../../../terrain/Params.js"
import AbstractComponent from "./AbstractComponent.js"

class CameraComponent extends AbstractComponent {
    start() {
        this.controller.state.meshPromise.then(mesh => {
            this.tick = this.run
            this.lookingAtTarget = true
            this.followTheTarget = true
            this.target = mesh
            this.offset = new THREE.Vector3(-2, 0, -5)
            this.lookAt(mesh.position.clone())
        })
        this.max = new THREE.Vector2()
    }
    stop() {
        this.tick = () => { }
    }
    setController(controller) {
        this.controller = controller
    }
    cameraMove(position) {
        let newPosition = position.clone()
        newPosition.add(this.offset)
        camera.position.lerp(newPosition, .1)
        //ground Collision and .5 up of it
        let trying = params.customNoiseGenerator(camera.position.x, -camera.position.z) + .5
        camera.position.y = Math.max(camera.position.y, trying)
    }
    lookAt(position) {
        let newPosition = position.clone()
        newPosition.y++
        newPosition.x += 1.5
        camera.lookAt(newPosition)
    }
    run = () => {
        let position = this.target.position.clone()
        let tmp = this.target.position.clone()
        tmp.z = this.target.children[4].children[0].position.z / 100
        tmp.x = this.target.children[4].children[0].position.x / 100
        //
        const vec2 = new THREE.Vector2(tmp.x, tmp.z);
        vec2.rotateAround(new THREE.Vector2(), this.target.rotation.y)
        position.x -= vec2.x
        position.z += vec2.y
        // //
        // this.max.x = Math.max(this.max.x, tmp.x)
        // this.max.y = Math.max(this.max.y, tmp.z)
        // let bonesPosition = new THREE.Vector2(tmp.x, tmp.z)
        // if (this.max.distanceTo(bonesPosition) > .5 && bonesPosition.length() < .5) {
        //     // const fix = new THREE.Vector2(this.max.x, this.max.y);
        //     // fix.rotateAround(new THREE.Vector2(), this.target.rotation.y)
        //     // this.target.position.z += fix.y
        //     // this.target.position.x -= fix.x
        //     // this.max.set(0, 0)
        //     // position.x = this.target.position.x
        //     // position.z = this.target.position.z
        //     // window.delta = .1
        //     // eventBus.dispatch('animation-translated', true)
        // }
        if (this.followTheTarget) this.cameraMove(position)
        if (this.lookingAtTarget) this.lookAt(position)        
    }
    tick = () => { }
}
let cameraComponent = new CameraComponent()
export default cameraComponent
export { CameraComponent }