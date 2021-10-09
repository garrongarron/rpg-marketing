import gravityConstant from "./Gravity.js";

let physicsWorld
let transformAux1
function initPhysics() {

    // Physics configuration
    let collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
    let dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    let broadphase = new Ammo.btDbvtBroadphase();
    let solver = new Ammo.btSequentialImpulseConstraintSolver();
    let softBodySolver = new Ammo.btDefaultSoftBodySolver();

    //this is the world
    physicsWorld = new Ammo.btSoftRigidDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration, softBodySolver);
    physicsWorld.setGravity(new Ammo.btVector3(0, gravityConstant, 0));
    physicsWorld.getWorldInfo().set_m_gravity(new Ammo.btVector3(0, gravityConstant, 0));

    transformAux1 = new Ammo.btTransform();

}

export default initPhysics

export { physicsWorld,  transformAux1}