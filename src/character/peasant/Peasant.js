import Loader from "../../basic/Loader.js"


const folder = "./src/character/peasant/"
let fileList = {
    '0':'dismissing gesture.fbx', //sword and shield idle.fbx'
    // '1':'sword and shield walk.fbx',
    // '2':'sword and shield walk (2).fbx',
    // '3':'sword and shield run.fbx',
    // '4':'sword and shield run (2).fbx',
}
const list = []

Object.keys(fileList).forEach((element, index) => {
    list[index] = folder + 'animations/'+ fileList[index]
})
const peasant = (new Loader(folder + 'animations/peasant_man.fbx', list, 0.01 *0.8)).getModel()

export default peasant