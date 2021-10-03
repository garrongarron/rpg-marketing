import camera from "../basic/Camera.js"
import moveController from "../basic/controllers/MoveController.js"
import orbitImplementation from "../basic/controllers/OrbitImplementation.js"
import ratationController from "../basic/controllers/RotationController.js"
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
import Animator from "../basic/Animator.js"
// import landerController from "../basic/controllers/LanderController.js"
import rayLander from "../basic/controllers/RayLander.js"


class Tutorial extends MasterScene {
    open() {
        scene.add(light)
        scene.add(cube)
        cube.position.y = 10
        cube.material.color = new THREE.Color(0x0000FF)
        camera.position.set(0, 7, 5)

        resize.start(renderer)
        loopMachine.addCallback(() => {
            renderer.render(scene, camera)
        })
        loopMachine.start()
        terrain.start(scene)

        terrainController.start(cube, terrain)

        keyListener.start()
        // sky.start()
        scene.add(skyFromShader)
        scene.add(water);
        scene.fog = new THREE.FogExp2(0x868293, 0.002);
        /////////////////////////////////////////////
        warrior.then(mesh => {
            this.mesh = mesh
            scene.add(mesh)
            moveController.start(mesh)
            rayLander.start(mesh, 0)
            ratationController.start(mesh)
            orbitImplementation.start(mesh)
            // landerController.start(mesh, 0)
            
            mesh.position.y = 4
            let animator = new Animator(mesh)
            animator.action(0, 1, false)
            animator.start()
        })
    }
    close() {
        console.log(`the Scene ${this.instanceName} is clossing`);
        loopMachine.clean()
    }
}

const tutorial = new Tutorial()

export default tutorial