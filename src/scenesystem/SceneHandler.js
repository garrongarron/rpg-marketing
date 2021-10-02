class SceneHandler{
    constructor(sceneList){
        this.prev = null
        this.sceneList = sceneList
        Object.keys(this.sceneList).forEach(key=>{
            this.sceneList[key].setInstanceName(key)
        })
    }
    goTo(sceneName){
        if(this.prev != null){
            this.prev.close()
        }
        this.sceneList[sceneName].open()
        this.sceneList[sceneName].setSceneHandler(this)
        this.prev = this.sceneList[sceneName]
    }
}

export default SceneHandler