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

class FrontCastle extends MasterScene {
    open() {
        scene.add(light)
        scene.add(cube)
        cube.position.set(1, 3, 3)
        // camera.lookAt(cube.position)
        resize.start(renderer)
        loopMachine.addCallback(() => {
            renderer.render(scene, camera)
        })
        loopMachine.start()
        terrain.start(scene)
        
        keyListener.start()
        
        // scene.add(skyFromShader)// scene.add(water);// dinamicWater.start()
        scene.fog = new THREE.FogExp2(0x868293, 0.002);
        // camera.position.set(0, 10, 20)
        warrior.then(mesh => {
            this.mesh = mesh
            scene.add(mesh)
            // this.mesh.position.set(0, 3, 0)
            moveController.start(mesh)
            moveController.mode.walk = 4
            rayLander.start(mesh, 0)
            rotationController.start(mesh)
            orbitImplementation.start(mesh)
            characterControllerZAxes.justRun = true
            characterControllerZAxes.start(mesh)
            terrainController.start(mesh, terrain)
            compass.start(mesh)
            skyFromShader.start(mesh)
            // orbitImplementation.start(mesh)         
            // landerController.start(mesh, 0)
            // let animator = new Animator(mesh)
            // animator.action(0, 1, false)
            // animator.start()
            // peasantController.start(mesh)
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