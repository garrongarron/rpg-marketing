import loopMachine from "../LoopMachine.js"

class TerrainController{
    constructor(){
        this.target = null
        this.terrain = null
    }
    start(target, terrain){
        this.target = target
        this.terrain = terrain
        loopMachine.addCallback(this.run.bind(this))
    }
    stop(){
        loopMachine.removeCallback(this.run.bind(this))
    }
    run(){
        this.terrain.tick(this.target)
    }
}

const terrainController = new TerrainController()

export default terrainController    