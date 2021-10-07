import loopMachine from "../LoopMachine.js"

class TerrainController {
    constructor() {
        this.target = null
        this.terrain = null
    }
    start(target, terrain) {
        this.target = target
        this.terrain = terrain
        loopMachine.addCallback(this.run)
    }
    stop() {
        loopMachine.removeCallback(this.run)
    }
    run = () => {
        this.terrain.tick(this.target)
    }
}

const terrainController = new TerrainController()

export default terrainController