import createParalellepiped from "../../../physics/CreateParalellepiped.js";
import initPhysics, { physicsWorld, transformAux1 } from "../../../physics/InitPhysics.js";
import margin from "../../../physics/Margin.js";
import rigidBodies from "../../../physics/RigidBodies.js";
import updatePhysics from "../../../physics/UpdatePhysics.js";
import loopMachine from "../../LoopMachine.js";
import scene from "../../Scene.js";

class FlagContainer {
    constructor() {
        this.clock = new THREE.Clock();
        this.clothWidth = 7.55;
        this.clothHeight = 4.22;
        this.clothPos = new THREE.Vector3(0, 0, 0);
        this.clothNumSegmentsZ = this.clothWidth * 3;
        this.clothNumSegmentsY = this.clothHeight * 3;
        this.clothSoftBody = null
        this.n = 0
        let textureLoader = new THREE.TextureLoader();
        this.textue = new Promise((res, rej) => {
            textureLoader.load("src/basic/environment/cloth/Three-Basico.png", function (texture) {
                res(texture)
            });
        })
    }
    buildCloth() {
        const clothGeometry = new THREE.PlaneGeometry(this.clothWidth, this.clothHeight, this.clothNumSegmentsZ, this.clothNumSegmentsY);
        clothGeometry.rotateY(Math.PI * 0.5);
        clothGeometry.translate(this.clothPos.x, this.clothPos.y + this.clothHeight * 0.5, this.clothPos.z - this.clothWidth * 0.5);
        const clothMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
        this.cloth = new THREE.Mesh(clothGeometry, clothMaterial);
        this.cloth.castShadow = true;
        this.cloth.receiveShadow = true;
        scene.add(this.cloth);
        // this.cloth.rotation.y = Math.PI*.5
    }
    addTexture = () => {
        this.textue.then(texture => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);
            this.cloth.material.map = texture;
            this.cloth.material.needsUpdate = true;
        });
    }
    clothPhysics() {
        // fisicas de la tela
        const softBodyHelpers = new Ammo.btSoftBodyHelpers();
        const clothCorner00 = new Ammo.btVector3(this.clothPos.x, this.clothPos.y + this.clothHeight, this.clothPos.z);
        const clothCorner01 = new Ammo.btVector3(this.clothPos.x, this.clothPos.y + this.clothHeight, this.clothPos.z - this.clothWidth);
        const clothCorner10 = new Ammo.btVector3(this.clothPos.x, this.clothPos.y, this.clothPos.z);
        const clothCorner11 = new Ammo.btVector3(this.clothPos.x, this.clothPos.y, this.clothPos.z - this.clothWidth);
        this.clothSoftBody = softBodyHelpers.CreatePatch(physicsWorld.getWorldInfo(), clothCorner00, clothCorner01, clothCorner10, clothCorner11, this.clothNumSegmentsZ + 1, this.clothNumSegmentsY + 1, 0, true);
        const sbConfig = this.clothSoftBody.get_m_cfg();
        sbConfig.set_viterations(10);
        sbConfig.set_piterations(10);

        this.clothSoftBody.setTotalMass(0.9, false);
        Ammo.castObject(this.clothSoftBody, Ammo.btCollisionObject).getCollisionShape().setMargin(margin * 3);
        physicsWorld.addSoftBody(this.clothSoftBody, 1, - 1);
        this.cloth.userData.physicsBody = this.clothSoftBody;
        // Disable deactivation
        this.clothSoftBody.setActivationState(4);
    }
    start(posVec3 = {}) {
        this.clothPos = new THREE.Vector3(posVec3.x || 0, posVec3.y || 0, posVec3.z || 0);
        initPhysics()
        this.buildCloth()
        this.addTexture()
        this.clothPhysics()
        this.builBaseMent()
        loopMachine.addCallback(this.run)
    }
    builBaseMent() {
        const pos = new THREE.Vector3();
        const quat = new THREE.Quaternion();

        // The base
        const armMass = 2;
        const armLength = .5 + this.clothWidth;
        const pylonHeight = this.clothPos.y + this.clothHeight;
        const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x606060 });

        //BASE
        // pos.set(this.clothPos.x, 0.1, this.clothPos.z - armLength);
        // quat.set(0, 0, 0, 1);
        // const base = createParalellepiped(1, 0.2, 1, 0, pos, quat, baseMaterial);
        // base.castShadow = true;
        // base.receiveShadow = true;
        // this.base = base

        // Pylon
        pos.set(this.clothPos.x, 0.5 * pylonHeight, this.clothPos.z - armLength);
        const pylon = createParalellepiped(0.4, pylonHeight, 0.4, 0, pos, quat, baseMaterial);
        this.pylon = pylon
        pylon.castShadow = true;
        pylon.receiveShadow = true;
        pos.set(this.clothPos.x, pylonHeight + 0.2, this.clothPos.z - 0.5 * armLength);

        //Arm
        const arm = createParalellepiped(0.4, 0.4, armLength + 0.4, armMass, pos, quat, baseMaterial);
        arm.castShadow = true;
        arm.receiveShadow = true;
        this.arm = arm

        // Glue the cloth to the arm
        const influence = 0.5;
        this.clothSoftBody.appendAnchor(0, arm.userData.physicsBody, false, influence);
        this.clothSoftBody.appendAnchor(this.clothNumSegmentsZ, arm.userData.physicsBody, false, influence);

        // Hinge constraint to move the arm
        const pivotA = new Ammo.btVector3(0, pylonHeight * 0.5, 0);
        const pivotB = new Ammo.btVector3(0, - 0.2, - armLength * 0.5);
        const axis = new Ammo.btVector3(0, 1, 0);
        let hinge = new Ammo.btHingeConstraint(
            pylon.userData.physicsBody,
            arm.userData.physicsBody,
            pivotA,
            pivotB,
            axis,
            axis, true);
        this.hinge = hinge
        physicsWorld.addConstraint(hinge, true);
    }

    run = () => {
        const deltaTime = this.clock.getDelta();
        updatePhysics(deltaTime)

        //rotate the main stick
        // this.pylon.userData.physicsBody.setAngularVelocity(new Ammo.btVector3(0, 1, 0))



        // setMotionState
        this.pylon.userData.physicsBody.getMotionState().getWorldTransform(transformAux1)
        transformAux1.setRotation(new Ammo.btQuaternion(0.680, -0.020, -0.695, 0.232));
        this.pylon.userData.physicsBody.getMotionState().setWorldTransform(transformAux1)



        // this.pylon.userData.physicsBody.getMotionState().getWorldTransform(transformAux1)
        // transformAux1.setRotation(new Ammo.btQuaternion( 0.680,-0.020,-0.695,0.232));
        // this.pylon.userData.physicsBody.getMotionState().setWorldTransform(transformAux1)

        // this.arm.userData.physicsBody.getMotionState().getWorldTransform(transformAux1)
        // const p = transformAux1.getOrigin();//position
        // const q = transformAux1.getRotation();
        // transformAux1.setRotation(new Ammo.btQuaternion(0,0,1,0));
        // this.arm.userData.physicsBody.getMotionState().setWorldTransform(transformAux1)


        // if(this.hinge) 
        this.n += .01
        this.hinge.enableAngularMotor(true, 0.1 * Math.sin(this.n * 1), 50);


        //update cloth 
        let cloth = this.cloth
        const softBody = cloth.userData.physicsBody;
        this.clothPositions = cloth.geometry.attributes.position.array;
        const numVerts = this.clothPositions.length / 3;
        const nodes = softBody.get_m_nodes();
        let indexFloat = 0;

        for (let i = 0; i < numVerts; i++) {

            const node = nodes.at(i);
            const nodePos = node.get_m_x();
            this.clothPositions[indexFloat++] = nodePos.x();
            this.clothPositions[indexFloat++] = nodePos.y();
            this.clothPositions[indexFloat++] = nodePos.z();

        }

        cloth.geometry.computeVertexNormals();
        cloth.geometry.attributes.position.needsUpdate = true;
        cloth.geometry.attributes.normal.needsUpdate = true;
    }
    stop() {
        loopMachine.removeCallback(this.run)
    }
}

const flagContainer = new FlagContainer()

export default flagContainer