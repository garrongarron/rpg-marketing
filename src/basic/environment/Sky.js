import scene from "../Scene.js";
import textureLoader from "../terrain/texture/TextureLoader.js";

class Sky {
    constructor() {
        this.skyDome = null
     }
    start() {
        textureLoader().then(textures => {
            textures[5].minFilter = THREE.LinearFilter; // Texture is not a power-of-two size; use smoother interpolation.
            this.skyDome = new THREE.Mesh(
                new THREE.SphereGeometry(8192, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5),
                new THREE.MeshBasicMaterial({ map: textures[5], side: THREE.BackSide, fog: false })
            );
            this.skyDome.position.y = -99;
            scene.add(this.skyDome);
        })
    }
    stop() { 
        scene.add(this.skyDome);
    }
}

const sky = new Sky()

export default sky