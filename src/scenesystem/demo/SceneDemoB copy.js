import camera from "../../basic/Camera.js"
import light from "../../basic/Light.js"
import loopMachine from "../../basic/LoopMachine.js"
import renderer from "../../basic/Renderer.js"
import resize from "../../basic/Resize.js"
import scene from "../../basic/Scene.js"
import createParalellepiped from "../../physics/CreateParalellepiped.js"
import initPhysics, { physicsWorld } from "../../physics/InitPhysics.js"
import margin from "../../physics/Margin.js"
import updatePhysics from "../../physics/UpdatePhysics.js"
import cube from "../../shapes/Cube.js"
import MasterScene from "../MasterScene.js"

class SceneDemoB extends MasterScene {
    open() {
        scene.add(light)
        scene.add(cube)
        cube.material.color = new THREE.Color(0x00FF00)
        camera.position.set(10, 5, 20)

        resize.start(renderer)

        
        initPhysics()//sssssssssssssssssssssssssssamu
        loopMachine.addCallback(() => {
            renderer.render(scene, camera)

            
            cube.rotation.y += 0.01
            const deltaTime = clock.getDelta();
            updatePhysics(deltaTime)
            


            // if(this.hinge) 
            hinge.enableAngularMotor(true, 0.1 * Math.sin(cube.rotation.y*2), 50);
            // if (!this.cloth) return
            //update cloth 
            let cloth = this.cloth
            const softBody = cloth.userData.physicsBody;
            const clothPositions = cloth.geometry.attributes.position.array;
            const numVerts = clothPositions.length / 3;
            const nodes = softBody.get_m_nodes();
            let indexFloat = 0;

            for (let i = 0; i < numVerts; i++) {

                const node = nodes.at(i);
                const nodePos = node.get_m_x();
                clothPositions[indexFloat++] = nodePos.x();
                clothPositions[indexFloat++] = nodePos.y();
                clothPositions[indexFloat++] = nodePos.z();

            }

            cloth.geometry.computeVertexNormals();
            cloth.geometry.attributes.position.needsUpdate = true;
            cloth.geometry.attributes.normal.needsUpdate = true;
            loopMachine.start()
        })



        //cloth
        const clothWidth = 7.55;
        const clothHeight = 4.22;

        const clothNumSegmentsZ = clothWidth * 2;
        const clothNumSegmentsY = clothHeight * 2;
        const clothPos = new THREE.Vector3(0, 0, 0);

        const clothGeometry = new THREE.PlaneGeometry(clothWidth, clothHeight, clothNumSegmentsZ, clothNumSegmentsY);
        clothGeometry.rotateY(Math.PI * 0.5);
        clothGeometry.translate(clothPos.x, clothPos.y + clothHeight * 0.5, clothPos.z - clothWidth * 0.5);

        const clothMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
        let cloth = new THREE.Mesh(clothGeometry, clothMaterial);
        this.cloth = cloth
        camera.lookAt(cloth.position)////////////////////////
        cloth.castShadow = true;
        cloth.receiveShadow = true;
        scene.add(cloth);
        let textureLoader = new THREE.TextureLoader();
        textureLoader.load("src/basic/environment/cloth/Three-Basico.png", function (texture) {

            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);
            cloth.material.map = texture;
            cloth.material.needsUpdate = true;
            loopMachine.start()
        });




        // fisicas de la tela
        const softBodyHelpers = new Ammo.btSoftBodyHelpers();
        const clothCorner00 = new Ammo.btVector3(clothPos.x, clothPos.y + clothHeight, clothPos.z);
        const clothCorner01 = new Ammo.btVector3(clothPos.x, clothPos.y + clothHeight, clothPos.z - clothWidth);
        const clothCorner10 = new Ammo.btVector3(clothPos.x, clothPos.y, clothPos.z);
        const clothCorner11 = new Ammo.btVector3(clothPos.x, clothPos.y, clothPos.z - clothWidth);
        const clothSoftBody = softBodyHelpers.CreatePatch(physicsWorld.getWorldInfo(), clothCorner00, clothCorner01, clothCorner10, clothCorner11, clothNumSegmentsZ + 1, clothNumSegmentsY + 1, 0, true);
        const sbConfig = clothSoftBody.get_m_cfg();
        sbConfig.set_viterations(10);
        sbConfig.set_piterations(10);

        clothSoftBody.setTotalMass(0.9, false);
        Ammo.castObject(clothSoftBody, Ammo.btCollisionObject).getCollisionShape().setMargin(margin * 3);
        physicsWorld.addSoftBody(clothSoftBody, 1, - 1);
        cloth.userData.physicsBody = clothSoftBody;
        // Disable deactivation
        clothSoftBody.setActivationState(4);


        const pos = new THREE.Vector3();
        const quat = new THREE.Quaternion();

        // The base
        const armMass = 2;
        const armLength = .5 + clothWidth;
        const pylonHeight = clothPos.y + clothHeight;
        const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x606060 });
        pos.set(clothPos.x, 0.1, clothPos.z - armLength);
        quat.set(0, 0, 0, 1);
        const base = createParalellepiped(1, 0.2, 1, 0, pos, quat, baseMaterial);
        base.castShadow = true;
        base.receiveShadow = true;
        pos.set(clothPos.x, 0.5 * pylonHeight, clothPos.z - armLength);
        const pylon = createParalellepiped(0.4, pylonHeight, 0.4, 0, pos, quat, baseMaterial);
        pylon.castShadow = true;
        pylon.receiveShadow = true;
        pos.set(clothPos.x, pylonHeight + 0.2, clothPos.z - 0.5 * armLength);
        const arm = createParalellepiped(0.2, 0.2, armLength + 0.4, armMass, pos, quat, baseMaterial);
        arm.castShadow = true;
        arm.receiveShadow = true;

        // Glue the cloth to the arm
        const influence = 0.5;
        clothSoftBody.appendAnchor(0, arm.userData.physicsBody, false, influence);
        clothSoftBody.appendAnchor(clothNumSegmentsZ, arm.userData.physicsBody, false, influence);

        // Hinge constraint to move the arm
        const pivotA = new Ammo.btVector3(0, pylonHeight * 0.5, 0);
        const pivotB = new Ammo.btVector3(0, - 0.2, - armLength * 0.5);
        const axis = new Ammo.btVector3(0, 1, 0);
        let hinge = new Ammo.btHingeConstraint(pylon.userData.physicsBody, arm.userData.physicsBody, pivotA, pivotB, axis, axis, true);
        this.hinge = hinge
        physicsWorld.addConstraint(hinge, true);
    }
    close() {
        loopMachine.clean()
        console.log(`the Scene ${this.instanceName} is clossing`);
    }
}

const sceneDemoB = new SceneDemoB()

export default sceneDemoB