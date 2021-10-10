import castleguardController from "../../basic/controllers/CastleguardController.js"
import { AnimationComponent } from "../../basic/controllers/CharacterController/components/AnimationComponent.js"
import { CameraComponent } from "../../basic/controllers/CharacterController/components/CameraComponent.js"
import { MovementComponent } from "../../basic/controllers/CharacterController/components/MovementComponent.js"
import tutorialCharacterController from "../../basic/controllers/CharacterController/TutorialCharacterController.js"
import pointLightController from "../../basic/controllers/PointLightController.js"
import eventBus from "../../basic/EventBus.js"
import loopMachine from "../../basic/LoopMachine.js"
import soundHandler from "../../basic/sound/SoundHandler.js"
import warrior from "../../character/warrior/Warrior.js"
import instructionContainer from "../../UI/compoment/InstructionContainer.js"
import wellDone from "../../UI/compoment/WellDone.js"

class FirstCombat {
    constructor() { }
    start() {
        warrior.then(mesh => {
            this.warrior = mesh
            loopMachine.addCallback(this.tick)
            castleguardController.start(mesh)//heavy loader.
        })
    }
    stop() {
        loopMachine.removeCallback(this.tick)
    }
    tick = () => {
        if (this.warrior.position.z * 1 < 5) {
            this.runMessage = true
            instructionContainer.node.classList.remove('fadeIn1')
        }
        if (this.warrior.position.z * 1 < 1) {
            soundHandler.play('plim')
            this.stop()
            tutorialCharacterController.stopComponent(MovementComponent)
            pointLightController.start(castleguardController.target)
            let state = {}
            state.title = 'Guardia del Castillo'
            state.message = 'Hey Guerrero! ¿Que haces vestido asi? ¿Acaso eres tú Alva Majo?'
            state.button = 'Sí! Soy Alva Majo'
            wellDone.update(state)
            document.querySelector('body').appendChild(wellDone.node)
            wellDone.setEventName('firstCombat')
            setTimeout(() => {
                wellDone.node.classList.add('fadeIn1')
            }, 100);
            this.warrior.rotation.y += -50 * Math.PI / 180
        }
    }
    next() {
        castleguardController.kick()
        let die = () => {
            castleguardController.animator.stop()
            castleguardController.stop()
            castleguardController.mesh.visible = false
        }
        let lookAtSouth = () => {
            eventBus.unSubscribe('animation-translated', lookAtSouth)
            this.animComponent.animator.inProgress = false
            this.animComponent.animator.action(this.animComponent.animations.idle, 1, true)
            this.animComponent.start()            
            //
            this.animComponent.animator.inProgress = false
            tutorialCharacterController.startComponent(MovementComponent)
            this.animComponent.animator.interpolationTime = 0.2
            this.warrior.rotation.y += 50 * Math.PI / 180
        }
        let startAttack = () => {
            setTimeout(() => {
                eventBus.subscribe('animation-translated', lookAtSouth)
                this.animComponent.animator.action(this.animComponent.animations.attack, 1, true)
                this.animComponent.animator.interpolationTime = 0//needed
            }, 100);
            setTimeout(() => {
                castleguardController.die()
                castleguardController.lookAtWarrior = false
                castleguardController.animator.whenAnimationEnd(die)
            }, 500);
        }
        setTimeout(() => {
            this.animComponent = tutorialCharacterController.getComponentByClass(AnimationComponent)
            this.animComponent.pause()
            this.animComponent.animator.action(this.animComponent.animations.impact2, 1, true)
            this.animComponent.animator.whenAnimationEnd(startAttack)
        }, 300);
    }
}

const firstCombat = new FirstCombat()

export default firstCombat