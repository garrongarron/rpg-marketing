import createParalellepiped from "../../../physics/CreateParalellepiped.js";
import initPhysics, { physicsWorld, transformAux1 } from "../../../physics/InitPhysics.js";
import margin from "../../../physics/Margin.js";
import physicsCleaner from "../../../physics/PhysicsCleaner.js";
import updatePhysics from "../../../physics/UpdatePhysics.js";
import cube from "../../../shapes/Cube.js";
import loopMachine from "../../LoopMachine.js";
import scene from "../../Scene.js";

class FlagContainer {
    constructor() {
        this.acumm = 0
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
        for (let index = 0; index < 60*3; index++) {
            this.run()
        }
        physicsCleaner.start(this.cloth)
        physicsCleaner.start(this.arm)
    }
    builBaseMent() {
        const pos = new THREE.Vector3();
        const quat = new THREE.Quaternion();

        // The base
        const armLength = .5 + this.clothWidth;
        const pylonHeight = this.clothPos.y + this.clothHeight;
        const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x606060 });

        // Pylon
        let pylon = cube.clone()
        pylon.scale.set(0.4, this.clothHeight, 0.4)
        pylon.position.set(this.clothPos.x, 0.5 * pylon.scale.y+this.clothPos.y, this.clothPos.z - armLength);
        pylon.geometry = pylon.geometry.clone()
        pylon.material = baseMaterial
        scene.add(pylon)
        this.pylon = pylon

        pos.set(this.clothPos.x, pylonHeight + 0.2, this.clothPos.z - 0.5 * armLength);

        //Arm
        const arm = createParalellepiped(0.4, 0.4, armLength + 0.4, 0, pos, quat, baseMaterial);
        this.arm = arm

        // Glue the cloth to the arm
        const influence = 0.5;
        this.clothSoftBody.appendAnchor(0, arm.userData.physicsBody, false, influence);
        this.clothSoftBody.appendAnchor(this.clothNumSegmentsZ, arm.userData.physicsBody, false, influence);
    }

    run = () => {
        updatePhysics(1000/60)

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
    cloneFlag(position = new THREE.Vector3(), height =0) {
        this.pylon.visible = false
        this.arm.visible = false
        this.cloth.visible = false

        let pylon = this.pylon.clone()
        pylon.geometry = pylon.geometry.clone()
        pylon.position.y = pylon.position.y - height/2
        pylon.scale.y = pylon.scale.y + height
        pylon.visible = true
        
        let arm = this.arm.clone()
        arm.geometry = arm.geometry.clone()
        arm.visible = true
        
        let flag = this.cloth.clone()
        flag.geometry = flag.geometry.clone()
        flag.visible = true
        flag.attach(pylon)
        flag.attach(arm)

        flag.position.copy(position)
        scene.add(flag)
    }
}

const flagContainer = new FlagContainer()

export default flagContainer