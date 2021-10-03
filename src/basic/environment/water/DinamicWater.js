import loopMachine from "../../LoopMachine.js";
import scene from "../../Scene.js";

class DinamicWater {
    constructor() { }
    start() {
        const waterGeometry = new THREE.PlaneGeometry(100, 100);

        let dinamicWater = new THREE.Water(
            waterGeometry,
            {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: new THREE.TextureLoader().load('src/basic/environment/water/waternormals.jpg', function (texture) {

                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

                }),
                sunDirection: new THREE.Vector3(),
                sunColor: 0xffffff,
                waterColor: 0x001e0f,
                distortionScale: 3.7,
                fog: scene.fog !== undefined
            }
        );

        loopMachine.addCallback(() => {
            if (dinamicWater) { }
            // dinamicWater.material.uniforms[ 'time' ].value += 0.001;    
        })
        dinamicWater.rotation.x = - Math.PI / 2;
        dinamicWater.position.y = .48
        scene.add(dinamicWater)
    }
    stop() { }
}

const dinamicWater = new DinamicWater()

export default dinamicWater