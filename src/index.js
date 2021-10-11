import sceneList from './scenesystem/demo/SceneList.js'
import SceneHandler from './scenesystem/SceneHandler.js'
// import './basic/terrain/GuiTerrain.js'
import './UI/StatsImplementation.js'
import './Sponsor.js'
Ammo().then(function (AmmoLib) {
    Ammo = AmmoLib;
    // console.log('a');
    let sceneHandler = new SceneHandler(sceneList)
    if (location.search == "?1") {
        sceneHandler.goTo(sceneList.tutorialScene)
    } else if (location.search == "?2") {
        sceneHandler.goTo(sceneList.frontCastleScene)
    } else {
        sceneHandler.goTo(sceneList.landingScene)
    }
    // sceneHandler.goTo(sceneList.landingScene)
});


