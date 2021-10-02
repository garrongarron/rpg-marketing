import sceneList from './scenesystem/demo/SceneList.js'
import SceneHandler from './scenesystem/SceneHandler.js'


let sceneHandler = new SceneHandler(sceneList)

sceneHandler.goTo(sceneList.landing)
