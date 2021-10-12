import camera from "../../basic/Camera.js"
import cameraForDialogs from "../../basic/controllers/CameraForDialogs.js"
import { CameraComponent } from "../../basic/controllers/CharacterController/components/CameraComponent.js"
import { MovementComponent } from "../../basic/controllers/CharacterController/components/MovementComponent.js"
import tutorialCharacterController from "../../basic/controllers/CharacterController/TutorialCharacterController.js"
import peasantController from "../../basic/controllers/PeasantController.js"
import pointLightController from "../../basic/controllers/PointLightController.js"
import dialogSystem from "../../basic/dialogsystem/DialogSystem.js"
import eventBus from "../../basic/EventBus.js"
import loopMachine from "../../basic/LoopMachine.js"
import soundHandler from "../../basic/sound/SoundHandler.js"
import warrior from "../../character/warrior/Warrior.js"
import sceneList from "../../scenesystem/demo/SceneList.js"
import instructionContainer from "../../UI/compoment/InstructionContainer.js"
import wellDone from "../../UI/compoment/WellDone.js"
import fadeInBlack from "../../UI/FadeInBlack.js"
import tutorialScene from "../TutorialScene.js"
import dialog from "./Dialog.js"

class TalkToOldMan{
    constructor(){}
    start(){
        warrior.then(mesh => {
            this.warrior = mesh
            loopMachine.addCallback(this.tick)
            peasantController.start(mesh)//heavy loadeing
        })
    }
    stop(){
        loopMachine.removeCallback(this.tick)
    }
    tick = () =>{
        if (this.warrior.position.z * 1 < -5) {
            soundHandler.play('plim')
            this.stop()
            tutorialCharacterController.stopComponent(MovementComponent)
            pointLightController.start(peasantController.target, {x:0, y:3, z:-1.5})
            let state = {}
            state.title = 'Anciano'
            state.message = 'Malditos guardias del castillo! Vaya bienvenida!  Ese guadria  se lo tenia merecido. <a href="#">Leer mas</a>'
            state.button = 'Continuar'
            wellDone.update(state)
            eventBus.dispatch('talkToOldMan', true)
            this.update(wellDone.node.querySelector('a'))
            document.querySelector('body').appendChild(wellDone.node)
            wellDone.setEventName('talkToOldMan')
            setTimeout(() => {
                wellDone.node.classList.add('fadeIn1')
            }, 100);
        }
    }
    update(node) {
        dialogSystem.loadContent(dialog)
        node.addEventListener('click', () => {
            dialogSystem.open()
        })
    }
    next(){
        eventBus.subscribe('dialogSystem',this.focus)
    }
    end(){
        tutorialCharacterController.state.direction.z = 1
        tutorialCharacterController.state.mode = 'run'
        setTimeout(() => {
            fadeInBlack.start(() => {
                // soundHandler.stop('running')
                tutorialScene.sceneHandler.goTo(sceneList.frontCastleScene)
                setTimeout(() => {
                    fadeInBlack.stop()
                    tutorialCharacterController.state.direction.z = 0
                    tutorialCharacterController.start(MovementComponent)
                }, 1000);
                instructionContainer.node.classList.remove('fadeIn1')
            })
        }, 7000);
        dialogSystem.close()
        tutorialCharacterController.startComponent(CameraComponent)
        eventBus.unSubscribe('dialogSystem',this.focus)
        setTimeout(() => {
            instructionContainer.update({
                title: 'Tutorial',
                message: 'Y asi fue como Alva Majo se encomendo en la tarea de eliminar al Rey Unity',
                btn: 'W'
            })
        }, 2000);
    }
    focus = (speaker) => {
        if (!this.flag) {
            let position = this.warrior.position.clone()
            position.y++
            position.x += 1.5
            let camPos = this.warrior.position.clone().add(new THREE.Vector3(0, 1.5, -2))
            camera.position.copy(camPos)
            cameraForDialogs.setPrev(position)
            this.flag = true
        }
        if (speaker == 'Anciano') {
            tutorialCharacterController.stopComponent(CameraComponent)
            cameraForDialogs.start(peasantController.mesh.position.clone().add(peasantController.mesh.up))
        }
        if (speaker == 'Guerrero') {
            tutorialCharacterController.stopComponent(CameraComponent)
            cameraForDialogs.start(this.warrior.position.clone().add(this.warrior.up))
        }
    }
}

const talkToOldMan = new TalkToOldMan()

export default talkToOldMan