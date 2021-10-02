import plane from "../../shapes/Plane.js"
import Noise from "../Noise.js";
import scene from "../Scene.js";

class Terrain {
    constructor() {
        this.data = {
            width: 0,
            height: 0,
            position: new THREE.Vector3()
        }
        this.chunks = new Map()
        this.group = new THREE.Group();
        this.position = new THREE.Vector3()
        this.prevPosition = new THREE.Vector3()
        this.chunksNeeded = []
    }
    getChunksNeeded() {
        this.chunksNeeded = []
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let x = this.position.x + i * this.data.width
                let z = this.position.z + j * this.data.width
                this.chunksNeeded.push(x + ":" + z)
            }
        }
        return this.chunksNeeded
    }
    update() {
        this.getChunksNeeded()
        let available = []
        let required = []
        this.chunks.forEach((v, k) => {
            if (this.chunksNeeded.indexOf(k) > -1) return
            available.push(this.chunks.get(k))
        })
        this.chunksNeeded.forEach(v => {
            if (this.chunks.has(v)) return
            required.push(v)
        })
        // available.forEach(mesh => {
        //     console.log(mesh.position.x, mesh.position.z);
        // })
        // console.log(required);

        available.forEach((mesh, index) => {
            let x = required[index].split(':')[0]
            let z = required[index].split(':')[1]
            this.chunks.delete(mesh.position.x + ":" + mesh.position.z, mesh)
            mesh.position.x = x
            mesh.position.z = z
            this.chunks.set(x + ":" + z, mesh)
            
        })
    }
   
    around(target) {
        this.position = target.position.clone()
        this.position.x = Math.round(this.position.x / this.data.width) * this.data.width
        this.position.y = this.position.y
        this.position.z = Math.round(this.position.z / this.data.height) * this.data.height
        if (this.prevPosition.equals(this.position)) return
        this.prevPosition = this.position
        this.update()
    }
    getData(plane) {
        this.data.width = plane.geometry.parameters.width
        this.data.height = plane.geometry.parameters.height
        this.data.position.copy(plane.position)
    }
    generateMorePlanes(plane) {
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let otherPlane = plane.clone(true)
                let colorStr = Math.random().toString().slice(2, 8)
                let c = new THREE.Color('#' + colorStr)//RED
                otherPlane.material = otherPlane.material.clone()
                otherPlane.material.color = c
                otherPlane.position.x = plane.position.x + i * this.data.width
                otherPlane.position.z = plane.position.z + j * this.data.height
                let position = `${otherPlane.position.x}:${otherPlane.position.z}`
                this.chunks.set(position, otherPlane)
                this.group.add(otherPlane);
            }
        }
    }
    start() {
        plane.rotation.x = -Math.PI * .5
        this.getData(plane)
        this.generateMorePlanes(plane)
        scene.add(this.group)
    }
    stop() {

    }
}

const terrain = new Terrain()

export default terrain