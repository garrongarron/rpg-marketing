import ParticleSystem from './ParticleSystem.js'
import loopMachine from '../LoopMachine.js'
import getDelta from '../Clock.js'
import scene from '../Scene.js'

class FireController{
    constructor(){
        this.blendingArr = [
            THREE.NormalBlending,
            THREE.AdditiveBlending
        ]
        this.textureArr = [
            'smokeparticle', 
            'fire'
        ]
        this.params = {
            'fire':{
                name:'fire',
                parent: scene,
                life: 1,
                pointMultiplier: window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))/2,//15,
                quantity: 50,
                texture: this.textureArr[1],
                blending: this.blendingArr[0],
                velocity: new THREE.Vector3(0, 10, 0),
                colors:[ new THREE.Color(0xFFFF80),new THREE.Color(0xFF8080) ]
            },
            'smoke':{
                name:'smoke',
                parent: scene,
                life: 3,
                pointMultiplier: window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))/3,//280 *15,
                quantity: 15,
                texture: this.textureArr[0],
                blending: this.blendingArr[0],
                velocity: new THREE.Vector3(0, 2, 0),
                colors:[ new THREE.Color(0x000000),new THREE.Color(0xcccccc) ]
            },
        }
        this.system = null
    }
    start(params, vector3 = null, parent = null){
        if(vector3) params.velocity = vector3
        if(parent) params.parent = parent
        let system = new ParticleSystem(params);
        let cb = ()=>{
            if(system){
                system.Step(getDelta());
            }
        }
        loopMachine.addCallback(cb)
        setTimeout(() => {
            system.off()
            setTimeout(() => {
                // loopMachine.removeCallback(cb)
            }, 1000*3);
        }, (params.name =='fire')?1000*5:1000*3);
    }
    stop(){

    }
}

const fireController = new FireController()

export default fireController