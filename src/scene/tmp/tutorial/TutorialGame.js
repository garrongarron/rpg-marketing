import cache from "../../../basic/Cache.js";
import camera from "../../../basic/Camera.js";
import cameraController from "../../../basic/controllers/CameraController.js";
import cameraForDialogs from "../../../basic/controllers/CameraForDialogs.js";
import castleguardController from "../../../basic/controllers/CastleguardController.js";
import characterControllerZAxes from "../../../basic/controllers/CharacterControllerZAxes.js";
import moveController from "../../../basic/controllers/MoveController.js";
import peasantController from "../../../basic/controllers/PeasantController.js";
import pointLightController from "../../../basic/controllers/PointLightController.js";
import dialogSystem from "../../../basic/dialogsystem/DialogSystem.js";
import eventBus from "../../../basic/EventBus.js";
import keyCode from "../../../basic/KeyCode.js";
import keyListener from "../../../basic/KeyListener.js";
import { LoopMachine } from "../../../basic/LoopMachine.js";
import loopMonitor from "../../../basic/LoopMonitor.js";
import soundHandler from "../../../basic/sound/SoundHandler.js";
import castleguard from "../../../character/castleguard/CastleGuar.js";
import peasant from "../../../character/peasant/Peasant.js";
import warrior from "../../../character/warrior/Warrior.js";
import sceneList from "../../../scenesystem/demo/SceneList.js";
import instructionContainer from "../../../UI/compoment/InstructionContainer.js";
import { progressBar } from "../../../UI/compoment/ProgressBar.js";
import wellDone from "../../../UI/compoment/WellDone.js";
import fadeInBlack from "../../../UI/FadeInBlack.js";
import tutorial from "../Tutorial.js";
import firstCombat from "./FirstCombat.js";
import outOfWater from "./OutOfWater.js";
import talkToOldMan from "./TalkToOldMan.js";
alert('as')
class TutorialGame {
    constructor() {
        this.flag = false
        // eventBus.subscribe('outOfWater', this.outOfWater)
        // eventBus.subscribe('talkToOldMan', this.talkToOldMan)
        // eventBus.subscribe('firstCombat', this.firstCombat)
        this.mesh = null
        this.peasant = null
        this.guard = null
    }
    firstCombat = (bool) => {
        if (bool) {
            moveController.stop()
            characterControllerZAxes.pause()
            keyListener.stop()
            pointLightController.start(castleguardController.target)
        } else {
            keyListener.start()
            characterControllerZAxes.keySwitcher = false
            // instructionContainer.update({
            //     title: 'Tutorial',
            //     message: 'Presiona [E] para atacar',
            //     btn: 'E'
            // })
            this.mesh.rotation.y += -50 * Math.PI / 180
            characterControllerZAxes.resume()
            characterControllerZAxes.animation = characterControllerZAxes.animations.idle
            setTimeout(() => {
                castleguardController.kick()
                let guardDie = () => {
                    console.log('guadria muere');
                    castleguardController.animation = castleguardController.animations.die
                    castleguardController.lookAtWarrior = false
                    castleguardController.animator.action(castleguardController.animations.die, 1, true)
                    castleguardController.animator.whenAnimationEnd(() => {
                        castleguardController.animator.stop()
                        castleguardController.stop()
                        castleguardController.mesh.visible = false
                        moveController.start(this.mesh)
                    })

                    characterControllerZAxes.keySwitcher = true
                }
                let move = () => {
                    let z = characterControllerZAxes.target.children[4].children[0].position.z / 100
                    let x = characterControllerZAxes.target.children[4].children[0].position.x / 100
                    const vec2 = new THREE.Vector2(x, z);
                    console.log(JSON.stringify(vec2));
                    vec2.rotateAround(new THREE.Vector2(), -characterControllerZAxes.target.rotation.y)
                    characterControllerZAxes.target.position.z += vec2.y
                    characterControllerZAxes.target.position.x += vec2.x
                    this.mesh.rotation.y += 50 * Math.PI / 180
                }
                let startAttack = () => {
                    setTimeout(() => {
                        console.log('startAttack');
                        characterControllerZAxes.animator.action(characterControllerZAxes.animations.attack, 1, true)
                        characterControllerZAxes.animator.whenAnimationEnd(move)
                    }, 10);
                    setTimeout(() => { guardDie() }, 500);
                }
                setTimeout(() => {
                    characterControllerZAxes.animator.action(characterControllerZAxes.animations.impact2, 1, true)
                    characterControllerZAxes.animator.whenAnimationEnd(startAttack)
                }, 300);
            }, 1200);
            talkToOldMan.start()

        }
    }
    outOfWater = (bool) => {
        if (bool) {
            moveController.stop()
            characterControllerZAxes.pause()
        } else {
            moveController.start(this.mesh)
            instructionContainer.update({
                title: 'Tutorial',
                message: '[Shift] + [W] para correr.',
                btn: 'W'
            })

            // talkToOldMan.start()
            firstCombat.start()
            characterControllerZAxes.resume()
        }
    }
    talkToOldMan = (bool) => {
        if (bool) {
            pointLightController.start(peasantController.target)
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

                fadeInBlack.start(() => {
                    soundHandler.stop('running')
                    tutorialGame.stop()
                    tutorial.sceneHandler.goTo(sceneList.frontCastle)
                    setTimeout(() => {
                        fadeInBlack.stop()
                        pointLightController.stop()
                    }, 1000);
                })
            }, 7000);
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
        castleguard.then(guard => { this.guard = guard })
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
        eventBus.subscribe('keyListener', this.sound)

    }
    sound = (data) => {
        let current = (data[2][16]) ? 'running' : 'footstep'
        let oposite = (!data[2][16]) ? 'running' : 'footstep'
        let play = data[2][keyCode.KEY_W] || data[2][keyCode.KEY_S]
        if (play) {
            if(!soundHandler.isPlaying(current)){
                soundHandler.setAsLoop(current)
                soundHandler.setVolume(current, .4)
                soundHandler.play(current)
                soundHandler.stop(oposite)
            }
        }
        let stop = !data[2][keyCode.KEY_W] && !data[2][keyCode.KEY_S]
        if (stop) {
            soundHandler.stop(oposite)
            soundHandler.stop(current)
        }
    }
    stop() {
        cache.appendChild(progressBar.node)
        cache.appendChild(wellDone.node)
        eventBus.unSubscribe('outOfWater', this.outOfWater)
        cache.appendChild(instructionContainer.node)
    }
}

const tutorialGame = new TutorialGame()
console.log('a');
export default tutorialGame
