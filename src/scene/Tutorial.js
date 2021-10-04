import camera from "../basic/Camera.js"
import moveController from "../basic/controllers/MoveController.js"
import orbitImplementation from "../basic/controllers/OrbitImplementation.js"
import rotationController from "../basic/controllers/RotationController.js"
import terrainController from "../basic/controllers/TarrainController.js"
import keyListener from "../basic/KeyListener.js"
import light from "../basic/Light.js"
import loopMachine from "../basic/LoopMachine.js"
import renderer from "../basic/Renderer.js"
import resize from "../basic/Resize.js"
import scene from "../basic/Scene.js"
import terrain from "../basic/terrain/Terrain.js"
import cube from "../shapes/Cube.js"
import water from "../basic/environment/Water.js"
import MasterScene from "../scenesystem/MasterScene.js"
import sky from "../basic/environment/Sky.js"
import skyFromShader from "../basic/environment/skyfromshader/SkyFromShader.js"
import warrior from "../character/warrior/Warrior.js"
import rayLander from "../basic/controllers/RayLander.js"
import cameraController from "../basic/controllers/CameraController.js"
import dinamicWater from "../basic/environment/water/DinamicWater.js"
import transparentWater from "../basic/environment/watertransparent/WaterTransparent.js"
import characterControllerZAxes from "../basic/controllers/CharacterControllerZAxes.js"
import tutorialGame from "./tutorial/TutorialGame.js"
import peasantController from "../basic/controllers/PeasantController.js"
import eventBus from "../basic/EventBus.js"


class Tutorial extends MasterScene {
    constructor(){
        super()
        this.mesh = null
        eventBus.subscribe('outOfWater',(bool)=>{
            if(bool) moveController.stop()
            if(!bool) moveController.start(this.mesh)
        })
    }
    open() {
        scene.add(light)
        scene.add(cube)
        cube.position.y = 10
        cube.material.color = new THREE.Color(0x0000FF)
        resize.start(renderer)
        loopMachine.addCallback(() => {
            renderer.render(scene, camera)
        })
        loopMachine.start()
        terrain.start(scene)
        terrainController.start(cube, terrain)
        keyListener.start()
        scene.add(skyFromShader)// scene.add(water);// dinamicWater.start()
        scene.add(transparentWater)
        scene.fog = new THREE.FogExp2(0x868293, 0.002);
        /////////////////////////////////////////////
        camera.position.set(0, 0, 5)
        warrior.then(mesh => {
            this.mesh = mesh
            this.mesh.rotation.y = Math.PI
            scene.add(mesh)
            setTimeout(() => {
                mesh.position.set(-3, 0, 32)
                camera.position.set(0, 0, 5)
                moveController.start(mesh)
                rayLander.start(mesh, 0)
            }, 1000);
            cameraController.start(mesh)
            characterControllerZAxes.start(mesh)
            // orbitImplementation.start(mesh)
            // rotationController.start(mesh)           
            // landerController.start(mesh, 0)
            // let animator = new Animator(mesh)
            // animator.action(0, 1, false)
            // animator.start()
            peasantController.start(mesh)
        })
        
        tutorialGame.start()
    }
    close() {
        console.log(`the Scene ${this.instanceName} is clossing`);
        loopMachine.clean()
    }
}

const tutorial = new Tutorial()

export default tutorial