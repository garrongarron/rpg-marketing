import cache from "../basic/Cache.js"
import eventBus from "../basic/EventBus.js"
import landing from "../scene/Landing.js"
import landingScene from "../scene/LandingScene.js"
import sceneList from "../scenesystem/demo/SceneList.js"
import fadeInBlack from "./FadeInBlack.js"

let tutorial = document.createElement('div')
tutorial.classList.add('btnTutorial')
tutorial.innerText = 'Tutorial'

let btnTutorial = (story) => {
    document.body.appendChild(tutorial)
    setTimeout(() => {
        tutorial.classList.add('btnTutorialVisible')
    }, 100);
    tutorial.addEventListener('click', () => {
        fadeInBlack.start(() => {
            eventBus.dispatch('gotoTutorial', true)
            // localStorage.setItem('n', JSON.stringify(1));
            cache.appendChild(tutorial)
            story.stop()
            document.body.style.backgroundImage = 'none'
            document.body.style.backgroundColor = 'black'
            setTimeout(() => {
                fadeInBlack.stop()
            }, 2000);
        })
    })
}

export default btnTutorial