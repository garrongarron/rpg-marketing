import { physicsWorld } from "./InitPhysics.js"

class PhysicsCleaner{
    constructor(){}
    start(threeObject){
        let body = threeObject.userData.physicsBody
        physicsWorld.removeSoftBody(body)
    }
    stop(){}
}

const physicsCleaner = new PhysicsCleaner()

export default physicsCleaner