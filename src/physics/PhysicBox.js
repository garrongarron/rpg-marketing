import createParalellepiped from './CreateParalellepiped.js';

const addPhysicBox = () =>{
    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();

    pos.set(0, 2, 0);
    quat.set(0, 0, 0, 1);
    const ground = createParalellepiped(1, 1, 1, .1/* mass*/, pos, quat, new THREE.MeshPhongMaterial({ color: 0xFFFF00 }));
    ground.castShadow = true;
    ground.receiveShadow = true;
}
export default addPhysicBox