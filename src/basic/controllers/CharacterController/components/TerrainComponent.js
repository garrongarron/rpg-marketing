import terrain from "../../../terrain/Terrain.js"
import AbstractComponent from "./AbstractComponent.js"

class TerrainComponent extends AbstractComponent{
    
    start(){
        this.mesh = null
        if (this.controller.state.meshPromise && terrain.isBuilt) {
            this.controller.state.meshPromise.then(mesh => {
                console.log('terrain Activated');
                this.mesh = mesh
                this.n = setInterval(this.run, 1000 * 5);
                this.run()
            })
        } else {
            console.error('this.controller.state.meshPromise AND terrain.isBuilt required');
        }
    }
    stop() {
        clearInterval(this.n)
    }
    run = () => {
        terrain.tick(this.mesh)
    }
}
let terrainComponent = new TerrainComponent
export default terrainComponent