import cube from "../../shapes/Cube.js";
import camera from "../Camera.js";
import loopMachine from "../LoopMachine.js";
import renderer from "../Renderer.js";


const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = true;
loopMachine.addCallback(() => {
    controls.target.set(
        cube.position.x,
        cube.position.y,
        cube.position.z,
    );
    controls.update();
})