import cache from "../../basic/Cache.js";
import camera from "../../basic/Camera.js";
import cameraController from "../../basic/controllers/CameraController.js";
import cameraForDialogs from "../../basic/controllers/CameraForDialogs.js";
import characterControllerZAxes from "../../basic/controllers/CharacterControllerZAxes.js";
import moveController from "../../basic/controllers/MoveController.js";
import dialogSystem from "../../basic/dialogsystem/DialogSystem.js";
import eventBus from "../../basic/EventBus.js";
import keyListener from "../../basic/KeyListener.js";
import { LoopMachine } from "../../basic/LoopMachine.js";
import loopMonitor from "../../basic/LoopMonitor.js";
import soundHandler from "../../basic/sound/SoundHandler.js";
import peasant from "../../character/peasant/Peasant.js";
import warrior from "../../character/warrior/Warrior.js";
import sceneList from "../../scenesystem/demo/SceneList.js";
import instructionContainer from "../../UI/compoment/InstructionContainer.js";
import { progressBar } from "../../UI/compoment/ProgressBar.js";
import wellDone from "../../UI/compoment/WellDone.js";
import fadeInBlack from "../../UI/FadeInBlack.js";
import tutorial from "../Tutorial.js";
import outOfWater from "./OutOfWater.js";
import talkToOldMan from "./TalkToOldMan.js";

class TutorialGame {
    constructor() {
        this.flag = false
        eventBus.subscribe('outOfWater', this.outOfWater)
        eventBus.subscribe('talkToOldMan', this.talkToOldMan)
        this.mesh = null
        this.peasant = null
    }
    outOfWater = (bool) => {
        if (bool) {
            moveController.stop()
            characterControllerZAxes.pause()
        } else {
            moveController.start(this.mesh)
            talkToOldMan.start()
            characterControllerZAxes.resume()
        }
    }
    talkToOldMan = (bool) => {
        if (bool) {
            moveController.stop()
            characterControllerZAxes.pause()
        } else {
            talkToOldMan.stop()
            moveController.start(this.mesh)
            characterControllerZAxes.resume()
            eventBus.unSubscribe('dialogSystem', this.dialogSystemCallback)
            cameraForDialogs.stop()
            cameraController.start(this.mesh)
            keyListener.stop()
            setTimeout(() => {
                fadeInBlack.start(()=>{
                    soundHandler.stop('running')
                    tutorialGame.stop()
                    tutorial.sceneHandler.goTo(sceneList.frontCastle)
                    setTimeout(() => {
                        fadeInBlack.stop()
                    }, 1000);
                })
            }, 10000);
            setTimeout(() => {
                soundHandler.setVolume('running', .4)
                soundHandler.play('running')
                moveController.speed = 4
                moveController.direction = 1
                characterControllerZAxes.animation = characterControllerZAxes.animations.runAhead
                instructionContainer.update({
                    title: 'Tutorial',
                    message: 'Y asi fue como Alva Majo se encomendo en la tarea de eliminar al Rey Unity',
                    btn: 'W'
                })
                instructionContainer.node.classList.add('fadeIn1')
            }, 2000);
        }
    }
    init() {
        warrior.then(mesh => {
            this.mesh = mesh
            cameraController.start(mesh)
        })
        peasant.then(peasant => { this.peasant = peasant })
        keyListener.start()
        
    }
    dialogSystemCallback = (speaker) => {
        if (!this.flag) {
            let position = this.mesh.position.clone()
            position.y++
            position.x += 1.5
            let camPos = this.mesh.position.clone().add(new THREE.Vector3(0, 1.5, -2))
            camera.position.copy(camPos)
            cameraForDialogs.setPrev(position)
            this.flag = true
        }
        if (speaker == 'Anciano') {
            cameraController.stop()
            cameraForDialogs.start(this.peasant.position.clone().add(this.peasant.up))
        }
        if (speaker == 'Guerrero') {
            cameraController.stop()
            cameraForDialogs.start(this.mesh.position.clone().add(this.peasant.up))
        }
    }
    start() {
        this.init()
        let caster = (data) => {
            eventBus.dispatch('keyListener', data)
        }
        keyListener.setCaster(caster)
        let loop = new LoopMachine()
        LoopMachine.store['TutorialGame'] = loop
        loop.start()
        progressBar.querySelector('body')
        wellDone.querySelector('body')
        outOfWater.start()
        this.flag = false
        eventBus.subscribe('dialogSystem', this.dialogSystemCallback)
    }
    stop() {
        cache.appendChild(progressBar.node)
        cache.appendChild(wellDone.node)
        eventBus.unSubscribe('outOfWater', this.outOfWater)
        cache.appendChild(instructionContainer.node)
    }
}

const tutorialGame = new TutorialGame()

export default tutorialGame
