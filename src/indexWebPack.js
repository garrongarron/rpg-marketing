import '../js/three.js'
import '../js/Water.js'
import '../js/Reflector.js'
import '../js/Refractor.js'
import '../js/Water2.js'
import '../js/OrbitControls.js'
import '../js/FBXLoader.js'
// import '../js/flatte.min.js'//worker

import sceneList from './scenesystem/demo/SceneList.js'
import SceneHandler from './scenesystem/SceneHandler.js'
// import './basic/terrain/GuiTerrain.js'
import './UI/StatsImplementation.js'
import './Sponsor.js'
import './styles/style.scss'

Ammo().then(function (AmmoLib) {
    Ammo = AmmoLib;
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

// console.log(window.Ammo);