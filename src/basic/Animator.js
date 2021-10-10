import machine from './LoopMachine.js'

class Animator {
    constructor(mesh) {
        this.mesh = mesh
        this.mixer = new THREE.AnimationMixer(mesh);
        this.clock = new THREE.Clock();
        this.clips = mesh.animations.map(animation => {
            return this.mixer.clipAction(animation)
        })
        this.lastClip = null
        this.interpolationTime = 0.2
        this.inProgress = false
        this.callback = null
        window.delta = 1
    }
    run = () => {

        let n = this.clock.getDelta() * window.delta
        this.mixer.update(n)
    }
    start() {
        machine.addCallback(this.run)
    }
    stop() {
        machine.removeCallback(this.run)
    }
    whenAnimationEnd(callback) {
        this.callback = callback
    }
    onCycleFinished = () => {
        this.inProgress = false
        if (this.callback)
            this.callback()
        this.callback = null
    }
    action(animationId, timeScale, cycleFlag) {
        if (this.inProgress) return
        if (cycleFlag) {
            this.mixer.addEventListener('loop', this.onCycleFinished)
            this.inProgress = true
        }
        this.mixer.timeScale = timeScale
        if (this.lastClip === null) {
            this.clips[animationId].play()
            this.lastClip = animationId
            return
        }
        if (this.lastClip == animationId) {
            return
        }
        this.clips[animationId].reset()
        this.clips[animationId].play()
        this.clips[this.lastClip].crossFadeTo(this.clips[animationId], this.interpolationTime, true)
        this.lastClip = animationId
    }
}
export default Animator