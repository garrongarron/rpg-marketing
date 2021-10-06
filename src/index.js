import sceneList from './scenesystem/demo/SceneList.js'
import SceneHandler from './scenesystem/SceneHandler.js'
// import './basic/terrain/GuiTerrain.js'

let sceneHandler = new SceneHandler(sceneList)
// let n = JSON.parse(localStorage.getItem('n')) || 0
// if (n == 0) {
//     sceneHandler.goTo(sceneList.landing)
// } else {
//     sceneHandler.goTo(sceneList.tutorial)
// }


sceneHandler.goTo(sceneList.tutorial)