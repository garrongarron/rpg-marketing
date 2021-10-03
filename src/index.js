import sceneList from './scenesystem/demo/SceneList.js'
import SceneHandler from './scenesystem/SceneHandler.js'
// import './basic/terrain/GuiTerrain.js'

let sceneHandler = new SceneHandler(sceneList)

sceneHandler.goTo(sceneList.tutorial)
