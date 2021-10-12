class MasterScene{
    constructor(){
        this.instanceName = null
        this.sceneHandler = null
        this.instancename
    }
    toString(){
        if(!this.instanceName){
            this.instanceName = '_Scene_'+Math.random()
        }
        return this.instanceName
    }
    setSceneHandler(sceneHandler){
        this.sceneHandler = sceneHandler
    }
    open(){}
    close(){}
}

export default MasterScene