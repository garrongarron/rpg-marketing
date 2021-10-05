import camera from "../basic/Camera.js"
import moveController from "../basic/controllers/MoveController.js"
import orbitImplementation from "../basic/controllers/OrbitImplementation.js"
import rayLander from "../basic/controllers/RayLander.js"
import rotationController from "../basic/controllers/RotationController.js"
import terrainController from "../basic/controllers/TarrainController.js"
import skyFromShader from "../basic/environment/skyfromshader/SkyFromShader.js"
import transparentWater from "../basic/environment/watertransparent/WaterTransparent.js"
import eventBus from "../basic/EventBus.js"
import keyListener from "../basic/KeyListener.js"
import light from "../basic/Light.js"
import loopMachine from "../basic/LoopMachine.js"
import renderer from "../basic/Renderer.js"
import resize from "../basic/Resize.js"
import scene from "../basic/Scene.js"
import terrain from "../basic/terrain/Terrain.js"
import warrior from "../character/warrior/Warrior.js"
import MasterScene from "../scenesystem/MasterScene.js"
import characterControllerZAxes from "../basic/controllers/CharacterControllerZAxes.js"
import cube from "../shapes/Cube.js"
import params from "../basic/terrain/Params.js"
import compass from "./frontcastle/Compass.js"
import shadowController from "../basic/controllers/ShadowController.js"
import environementHandler from "./environment/EnvironmentHandler.js"

class FrontCastle extends MasterScene {
    open() {
        resize.start(renderer)
        loopMachine.addCallback(() => {
            renderer.render(scene, camera)
        })
        loopMachine.start()
        keyListener.start()

        warrior.then(mesh => {
            this.mesh = mesh
            scene.add(mesh)
            if (this.mesh.position.y == 0) {
                this.mesh.position.set(0, 3, 0)
                camera.position.set(0, 10, 20)
            }
            moveController.start(mesh)
            moveController.mode.walk = 4
            rayLander.start(mesh, 0)
            rotationController.start(mesh)
            orbitImplementation.start(mesh)
            characterControllerZAxes.justRun = true
            characterControllerZAxes.start(mesh)
            compass.start(mesh)
            environementHandler.start(this.mesh)
            // environementHandler.night()
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