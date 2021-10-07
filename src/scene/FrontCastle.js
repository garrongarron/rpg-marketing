import camera from "../basic/Camera.js"
import moveController from "../basic/controllers/MoveController.js"
import orbitImplementation from "../basic/controllers/OrbitImplementation.js"
import rayLander from "../basic/controllers/RayLander.js"
import rotationController from "../basic/controllers/RotationController.js"
// import terrainController from "../basic/controllers/TarrainController.js"
// import skyFromShader from "../basic/environment/skyfromshader/SkyFromShader.js"
// import transparentWater from "../basic/environment/watertransparent/WaterTransparent.js"
import eventBus from "../basic/EventBus.js"
import keyListener from "../basic/KeyListener.js"
// import light from "../basic/Light.js"
import loopMachine from "../basic/LoopMachine.js"
import renderer from "../basic/Renderer.js"
import resize from "../basic/Resize.js"
import scene from "../basic/Scene.js"
// import terrain from "../basic/terrain/Terrain.js"
import warrior from "../character/warrior/Warrior.js"
import MasterScene from "../scenesystem/MasterScene.js"
import characterControllerZAxes from "../basic/controllers/CharacterControllerZAxes.js"
// import cube from "../shapes/Cube.js"
// import params from "../basic/terrain/Params.js"
import compass from "./frontcastle/Compass.js"
// import shadowController from "../basic/controllers/ShadowController.js"
import environementHandler from "./environment/EnvironmentHandler.js"
import godot from "../character/dragon/Godot.js"
import headquarter from "../basic/buildings/Headquarter.js"
import params from "../basic/terrain/Params.js"

class FrontCastle extends MasterScene {
    open() {
        resize.start(renderer)
        loopMachine.addCallback(() => {
            if (this.mesh && this.godot) {
                let pos = this.mesh.position.clone()
                pos.y = this.godot.position.y
                this.godot.lookAt(pos)
            }
            renderer.render(scene, camera)
        })
        loopMachine.start()
        keyListener.start()
        godot.then(mesh => {
            this.godot = mesh
            scene.add(mesh)
            let pos = {
                x: 9.35554280260959,
                y: 1.1562213741056473,
                z: -120.90295582921397
            }
            mesh.rotation.y = Math.PI * .98
            mesh.position.set(pos.x, pos.y, pos.z)
        })
        let pos = {
            x: 0,
            y: 20,
            z: -354
        }
        params.filters = (x, y, out) => {
            let internalRadio = 150
            let externalRadio = 60
            let levelY = pos.y - 3
            //
            let a = new THREE.Vector2(x, y)
            let b = new THREE.Vector2(pos.x, -pos.z)
            let distance = a.distanceTo(b)
            if (distance < internalRadio) {
                let val = (distance - externalRadio) / (internalRadio - externalRadio)
                let lerp = THREE.MathUtils.clamp(val, 0, 1)
                return THREE.MathUtils.lerp(levelY, out, lerp)
            }
            return out
        }
        headquarter.then(mesh => {
            scene.add(mesh)
            mesh.position.set(pos.x, pos.y, pos.z)
        })
        warrior.then(mesh => {
            this.mesh = mesh
            scene.add(mesh)
            if (this.mesh.position.y == 0) {
                this.mesh.position.set(0, 3, 0)
                this.mesh.rotation.y = Math.PI
                camera.position.set(0, 10, 20)
            }

            // camera.position.set(this.mesh.position.x, this.mesh.position.y +5, this.mesh.position.z-20)
            moveController.start(mesh)
            moveController.mode.walk = 4
            rayLander.start(mesh, 0)
            rotationController.start(mesh)
            orbitImplementation.start(mesh)
            characterControllerZAxes.justRun = true
            characterControllerZAxes.start(mesh)
            compass.start(mesh)
            environementHandler.start(this.mesh)
            environementHandler.night()
        })
        let caster = (data) => {
            eventBus.dispatch('keyListener', data)
        }
        keyListener.setCaster(caster)

    }
    close() {
        loopMachine.clean()
        console.log(`the Scene ${this.instanceName} is clossing`);
    }
}

const frontCastle = new FrontCastle()

export default frontCastle