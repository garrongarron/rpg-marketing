import sceneList from './scenesystem/demo/SceneList.js'
import SceneHandler from './scenesystem/SceneHandler.js'
// import './basic/terrain/GuiTerrain.js'

Ammo().then(function (AmmoLib) {
    Ammo = AmmoLib;
    let sceneHandler = new SceneHandler(sceneList)
    if (location.search == "?1") {
        sceneHandler.goTo(sceneList.tutorial)
    } else if (location.search == "?2") {
        sceneHandler.goTo(sceneList.frontCastle)
    } else {
        sceneHandler.goTo(sceneList.landing)
    }
    // sceneHandler.goTo(sceneList.sceneDemoB)
});


