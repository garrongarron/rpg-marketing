import landing from "../scene/Landing.js"
import sceneList from "../scenesystem/demo/SceneList.js"
import fadeInBlack from "./FadeInBlack.js"

let tutorial = document.createElement('div')
tutorial.classList.add('btnTutorial')
tutorial.innerText = 'Tutorial'

let btnTutorial = () => {
    document.body.appendChild(tutorial)
    setTimeout(() => {
        tutorial.classList.add('btnTutorialVisible')
    }, 10);
    tutorial.addEventListener('click', () => {
        fadeInBlack.start(() => {
            landing.sceneHandler.goTo(sceneList.sceneDemoB)
            let tmp  = document.createElement('div')
            tmp.appendChild(tutorial)
            setTimeout(() => {
                fadeInBlack.stop()
            }, 1000);
        })
    })
}

export default btnTutorial