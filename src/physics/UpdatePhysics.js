import { physicsWorld, transformAux1 } from "./InitPhysics.js";
import rigidBodies from "./RigidBodies.js ";

function updatePhysics( deltaTime ) {
    // Step world
    physicsWorld.stepSimulation( deltaTime, 10 );
    // Update rigid bodies
    for ( let i = 0, il = rigidBodies.length; i < il; i ++ ) {
        const objThree = rigidBodies[ i ];
        const objPhys = objThree.userData.physicsBody;
        const ms = objPhys.getMotionState();
        if ( ms ) {
            ms.getWorldTransform( transformAux1 );
            const p = transformAux1.getOrigin();//position
            const q = transformAux1.getRotation();
            objThree.position.set( p.x(), p.y(), p.z() );
            objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );
        }
    }
}

export default updatePhysics