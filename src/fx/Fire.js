import cache from "../basic/Cache.js"
import loopMachine from "../basic/LoopMachine.js"

class Fire {
    constructor() {
        let fragment = new Promise((res, rej) => {
            fetch('src/shaders/vertexShaderIntro.glsl').then(a => a.text()).then(shader => {
                res(shader)
            })
        })
        let vertex = new Promise((res, rej) => {
            fetch('src/shaders/fragmentShaderFire.glsl').then(a => a.text()).then(shader => {
                res(shader)
            })
        })
        this.fireShaders = Promise.all([vertex, fragment])
        this.canvas = null
    }
    start() {
        this.uniforms = {
            u_time: { type: "f", value: 1.0 },
            u_resolution: { type: "v2", value: new THREE.Vector2() },
            u_mouse: { type: "v2", value: new THREE.Vector2() }
        };
        if (!this.canvas) {
            this.canvas = document.createElement('canvas')
            this.canvas.classList.add('fire')
            this.renderer = new THREE.WebGLRenderer({ 'canvas': this.canvas, alpha: true });
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            var geometry = new THREE.PlaneBufferGeometry(2, 2);
            this.fireShaders.then(shaders => {
                var material = new THREE.ShaderMaterial({
                    uniforms: this.uniforms,
                    vertexShader: shaders[1],
                    fragmentShader: shaders[0]
                });
                this.mesh = new THREE.Mesh(geometry, material);
                this.uniforms.u_resolution.value.x = window.innerWidth * 0.5;
                this.uniforms.u_resolution.value.y = window.innerHeight * 0.5;

                this.renderer.setSize(window.innerWidth, window.innerHeight);
                document.body.appendChild(this.renderer.domElement);
                window.addEventListener('resize', () => {
                    this.renderer.setSize(window.innerWidth, window.innerHeight);
                    this.camera.aspect = window.innerWidth, window.innerHeight
                    this.camera.updateProjectionMatrix()
                })
                const geometry1 = new THREE.BoxGeometry();
                const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                const cube = new THREE.Mesh(geometry1, material1);
                this.scene.add(this.mesh)
                this.mesh.material.transparency = true
                this.mesh.material.opacity = .5
                this.camera.position.z = 5;
            })
        } else{
            document.querySelector('body').appendChild(this.canvas)
        }

        loopMachine.addCallback(this.tick)

    }
    tick = () => {
        this.uniforms.u_time.value += 0.05 * .25;
        // console.log(this.uniforms.u_time.value);
        if (this.renderer) this.renderer.render(this.scene, this.camera);
    }
    stop() {
        cache.appendChild(this.canvas)
        loopMachine.removeCallback(this.tick)
    }
}

const fire = new Fire()

export default fire

