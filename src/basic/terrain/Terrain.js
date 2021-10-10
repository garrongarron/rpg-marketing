import plane from "../../shapes/Plane.js"
import scene from "../Scene.js";
import noiseGenerator from "./NoiseGenerator.js";
import params from "./Params.js";
import { noise2 } from "./Perlin.js";
import getMaterial from "./texture/Blender.js";

class Terrain {
    constructor() {
        this.data = {
            width: 0,
            height: 0,
            position: new THREE.Vector3()
        }
        this.chunks = new Map()
        this.group = new THREE.Group();
        this.group.name = "Terrain"
        this.position = new THREE.Vector2()
        this.prevPosition = new THREE.Vector2()
        this.chunksNeeded = []
        this.isBuilt = false
    }
    getChunksNeeded() {
        this.chunksNeeded = []
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let x = this.position.x + i * this.data.width
                let z = this.position.y + j * this.data.width
                this.chunksNeeded.push(x + ":" + z)
            }
        }
        return this.chunksNeeded
    }
    updateAgain() {
        this.chunks.forEach((v, k) => {
            this.modifyVerticalPosition(v)
        })
    }
    updateTerrain() {
        this.group.children.forEach(plane => {
            this.modifyVerticalPosition(plane)
        })
    }
    update() {
        console.log('update');
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

        available.forEach((mesh, index) => {
            let x = required[index].split(':')[0]
            let z = required[index].split(':')[1]
            this.chunks.delete(mesh.position.x + ":" + mesh.position.z, mesh)
            mesh.position.x = x
            mesh.position.z = z
            this.chunks.set(x + ":" + z, mesh)
            this.modifyVerticalPosition(mesh)
        })
    }
    modifyVerticalPosition(plane) {
        let v = plane.geometry.attributes.position.array
        let nnn = v.length / 3

        let x = plane.position.x * 1
        let y = plane.position.z * 1
        for (let index = 0; index < nnn; index++) {
            v[index * 3 + 2] = params.customNoiseGenerator(
                v[index * 3 + 0] + x,
                v[index * 3 + 1] - y
            )
        }
        plane.geometry.verticesNeedUpdate = true;
        plane.geometry.normalsNeedUpdate = true;
        plane.geometry.computeVertexNormals();
        // plane.geometry.computeFaceNormals();
        plane.geometry.normalizeNormals();
        plane.matrixAutoUpdate = true;
        plane.updateMatrix();
        plane.geometry.attributes.position.needsUpdate = true;
        plane.geometry.dynamic = true;
    }
    tick(target) {
        this.position.x = Math.round(target.position.x / this.data.width) * this.data.width
        this.position.y = Math.round(target.position.z / this.data.height) * this.data.height
        if (this.prevPosition.equals(this.position)) return
        this.prevPosition = this.position.clone()
        this.update()
    }
    getData(plane) {
        this.data.width = plane.geometry.parameters.width
        this.data.height = plane.geometry.parameters.height
        this.data.position.copy(plane.position)
    }

    generateMorePlanes(plane) {
        getMaterial().then(material => {
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    let otherPlane = plane.clone(true)
                    let colorStr = Math.random().toString().slice(2, 8)
                    let c = new THREE.Color('#' + colorStr)//RED
                    // otherPlane.material = otherPlane.material.clone()//material
                    otherPlane.castShadow = true; //default is false
                    otherPlane.receiveShadow = true; //default
                    otherPlane.material = material
                    otherPlane.geometry = otherPlane.geometry.clone()
                    otherPlane.material.color = c
                    otherPlane.position.x = this.position.x + i * this.data.width
                    otherPlane.position.z = this.position.y + j * this.data.height
                    let position = `${otherPlane.position.x}:${otherPlane.position.z}`
                    this.chunks.set(position, otherPlane)
                    this.group.add(otherPlane);
                    this.modifyVerticalPosition(otherPlane)
                }
            }
        })

    }
    start() {
        scene.add(this.group)
        if (this.isBuilt) return
        this.isBuilt = true
        plane.rotation.x = -Math.PI * .5
        this.getData(plane)
        this.generateMorePlanes(plane)

    }
    stop() {
        scene.remove(this.group)
    }
}

const terrain = new Terrain()

export default terrain