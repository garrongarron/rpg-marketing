import scene from "../../Scene.js";
import params from "../../terrain/Params.js";
import fileList from "./FileList.js";
// import gravity from '../character/Gravity.js'

class Trees {
    constructor() {
        this.models = []
        this.loader = null
        this.trees = []
        this.promises = null
        this.group = null
    }
    init() {
        this.loader = new THREE.FBXLoader();
        Object.keys(fileList).map(k => {
            let promise = new Promise((resolve, reject) => {
                this.loader.load(`src/basic/environment/Trees/${fileList[k]}_1.fbx`, function (object) {
                    resolve(object)
                })
            })
            this.models.push(promise)
        })
        this.promises = Promise.all(this.models)
    }
    start(center, radio, quantity) {
        if (this.trees.length > 0) {
            scene.add(this.group)
        } else {
            this.center = center
            this.radio = radio
            this.quantity = quantity
            this.init()
            this.promises.then(trees => {
                trees.forEach(tree => {
                    this.trees.push(tree)
                })
                this.clone()
            })
        }
    }
    clone = () => {
        this.group = new THREE.Group()
        for (let index = 0; index < this.quantity; index++) {
            let three = this.trees[Math.floor(Math.random() * this.trees.length)]
            let x = this.center.x += Math.random() * this.radio * 2 - this.radio
            let z = this.center.y += Math.random() * this.radio * 2 - this.radio
            three.position.set(x, params.customNoiseGenerator(x, -z), z)
            let scale = 0.06
            three.scale.set(scale, scale, scale)
            three.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            three.castShadow = true; //default is false
            three.receiveShadow = true; //default
            this.group.add(three)
            
        }
        scene.add(this.group)
    }
    stop() {
        if(this.group) scene.remove(this.group)
    }
}

const trees = new Trees()

export default trees
