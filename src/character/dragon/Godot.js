import Loader from "../../basic/Loader.js"


const folder = "./src/character/dragon/"

const list = []

// Object.keys(fileList).forEach((element, index) => {
//     list[index] = folder + 'animations/'+ fileList[index]
// })
const godot = (new Loader(folder + 'godot.2.fbx', list, .1)).getModel()

export default godot