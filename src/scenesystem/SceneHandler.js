import MasterScene from "./MasterScene.js"

class SceneHandler {
    constructor(sceneList) {
        this.prev = null
        this.sceneList = sceneList
    }
    goTo(sceneName) {
        if (sceneName instanceof Promise) {
            sceneName.then(module => {
                this.sceneList[module.toString()] = module
                this.process(module)
            })
        } else if (sceneName instanceof MasterScene) {
            this.process(sceneName)
        } else{
            console.error(`Scene ${sceneName}`)
        }

    }
    process(sceneName) {
        if (this.prev != null) {
            this.prev.close()
        }
        this.sceneList[sceneName].open()
        this.sceneList[sceneName].setSceneHandler(this)
        this.prev = this.sceneList[sceneName]
    }
}

export default SceneHandler