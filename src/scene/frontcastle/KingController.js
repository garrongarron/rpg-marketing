import Animator from "../../basic/Animator.js"
import camera from "../../basic/Camera.js"
import { AnimationComponent } from "../../basic/controllers/CharacterController/components/AnimationComponent.js"
import { MovementComponent } from "../../basic/controllers/CharacterController/components/MovementComponent.js"
import tutorialCharacterController from "../../basic/controllers/CharacterController/TutorialCharacterController.js"
import pointLightController from "../../basic/controllers/PointLightController.js"
import eventBus from "../../basic/EventBus.js"
import scene from "../../basic/Scene.js"
import king from "../../character/king/King.js"
import instructionContainer from "../../UI/compoment/InstructionContainer.js"
import wellDone from "../../UI/compoment/WellDone.js"

class KingController {
    constructor() { }
    start() {
        king.then(mesh => {
            this.mesh = mesh
            scene.add(mesh)
            this.pos = { x: 0, y: 17, z: -313 }
            mesh.position.copy(this.pos)
            window.scene = scene
            camera.lookAt(mesh.position.clone().add(mesh.up))
            this.pos.z = -310
            this.pos.y += 2
            this.anim = new Animator(mesh)
            this.anim.clips[4] = THREE.AnimationUtils.subclip(this.anim.clips[2]._clip, 'die', 60, 100000, 30)
            this.anim.clips[4] = this.anim.mixer.clipAction(this.anim.clips[4])
            this.anim.clips[4].clampWhenFinished = true
            this.anim.action(0, 1, false)
            this.anim.start()
        })
        eventBus.subscribe('kingChating', this.acting.bind(this))
    }

    move = () => {
        let warrior = this.mesh
        let z = -.8
        let x = 0
        const vec2 = new THREE.Vector2(x, z);
        vec2.rotateAround(new THREE.Vector2(), -warrior.rotation.y)
        warrior.position.z -= vec2.y
        warrior.position.x -= vec2.x
    }
    acting() {
        this.animComponent = tutorialCharacterController.getComponentByClass(AnimationComponent)
        this.animComponent.pause()
        let id = this.animComponent.animations.idle
        this.animComponent.animator.action(id, 1, true)
        setTimeout(() => {
            let id = this.animComponent.animations.attack
            this.animComponent.animator.action(id, 1, true)
            this.animComponent.animator.interpolationTime = 0//needed
            this.animComponent.animator.whenAnimationEnd(() => {
                let id = this.animComponent.animations.idle
                this.animComponent.animator.action(id, 1, true)
            })
        }, 3000);
        setTimeout(() => {
            this.anim.action(2, 1, false)
        }, 4000);
        setTimeout(() => {
            this.move()
            // this.anim.clips[this.anim.lastClip].weight = 0
            this.anim.interpolationTime = 0
            this.anim.action(3, 1, false)
        }, 6000);
        setTimeout(() => {
            this.anim.interpolationTime = .2
            this.anim.action(4, 1, true)
            this.anim.clips[4].repetitions = 1
            this.anim.whenAnimationEnd(() => { this.anim.stop })
            instructionContainer.querySelector('body')
            instructionContainer.update({
                title: 'Tutorial',
                message: 'Un minuto de silencio para el Rey Unity. Ahora se podran realizar videojuegos en "JavaScript"',
                btn: 'F'
            })
            setTimeout(() => {
                instructionContainer.update({
                    title: 'Tutorial',
                    message: 'No entres al castillo!',
                    btn: 'F'
                })
                tutorialCharacterController.getComponentByClass(MovementComponent).start()
                this.animComponent.start()
            }, 10000);
        }, 8000);

    }
    fightWithTheKing(){
        tutorialCharacterController.state.mesh.lookAt(this.mesh.position)
        let pos = { x: 0, y: 17, z: -310 }
        tutorialCharacterController.state.mesh.position.copy(pos)
        tutorialCharacterController.state.mesh.rotation.copy(this.mesh.rotation)
        tutorialCharacterController.state.mesh.rotation.y += Math.PI
        tutorialCharacterController.getComponentByClass(MovementComponent).stop()
        pointLightController.start(this.mesh)
        pointLightController.light.position.copy(this.pos)
        wellDone.querySelector('body')//
        let state = {}
        state.title = 'El rey Unity'
        state.message = ' ¿Que haces con una espada? ¿Acaso vienes a matarme?'
        state.button = 'Lo haré si es necesario'
        wellDone.update(state)
        wellDone.setEventName('kingChating')
        setTimeout(() => {
            wellDone.node.classList.add('fadeIn1')
        }, 100);
        
    }
    stop() { }
}

const kingController = new KingController()

export default kingController