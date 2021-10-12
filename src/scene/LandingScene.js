import camera from "../basic/Camera.js"
import light from "../basic/Light.js"
import loopMachine from "../basic/LoopMachine.js"
import renderer from "../basic/Renderer.js"
import resize from "../basic/Resize.js"
import scene from "../basic/Scene.js"
import MasterScene from "../scenesystem/MasterScene.js"
import fire from "../fx/Fire.js"
import PlayNow from "../UI/compoment/PlayNow.js"
import landingSceneCinematic from "./landingscene/LandingSceneCinematic.js"
import eventBus from "../basic/EventBus.js"
import sceneList from "../scenesystem/demo/SceneList.js"
import warrior from "../character/warrior/Warrior.js"
import Animator from "../basic/Animator.js"

class LandingScene extends MasterScene {
    open() {
        warrior.then(mesh => {
            scene.add(mesh)
            this.anim = new Animator(mesh)
            this.anim.action(0, 1, false)
            this.anim.start()
            setTimeout(() => {
                this.playNow = new PlayNow()
                document.body.style.backgroundImage = 'linear-gradient(black, rgb(151, 56, 56))'
                document.body.style.backgroundColor = 'black'
                scene.add(light)
                eventBus.subscribe('gotoTutorial', this.nextScene)
                resize.start(renderer)
                loopMachine.addCallback(this.tick)
                landingSceneCinematic.start()
                this.playNow.querySelector('body')
                loopMachine.start()
                fire.start()
            }, 1000);
        })
    }
    tick = () => {
        renderer.render(scene, camera)
    }
    nextScene = () => {
        this.sceneHandler.goTo(sceneList.tutorialScene)
    }
    close() {
        this.anim.stop()
        scene.remove(light)
        eventBus.unSubscribe('gotoTutorial', this.nextScene)
        loopMachine.removeCallback(this.tick)
        landingSceneCinematic.stop()
        fire.stop()
        this.playNow.drop()
    }
}

const landingScene = new LandingScene()
export default landingScene
// export default landingScene