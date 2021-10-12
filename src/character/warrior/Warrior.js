import Loader from "../../basic/Loader.js"


const folder = "./src/character/warrior/"
let fileList = {
    '0':'sword and shield idle (4).fbx', //sword and shield idle.fbx'
    '1':'sword and shield walk.fbx',
    '2':'sword and shield walk (2).fbx',
    '3':'sword and shield run.fbx',
    '4':'sword and shield run (2).fbx',
    '5':'sword and shield attack (3).fbx', //sword and shield idle.fbx'
    '6':'sword and shield impact (3).fbx',
    // '7':'sword and shield block idle.fbx'
}
const list = []

Object.keys(fileList).forEach((element, index) => {
    list[index] = folder + 'animations/'+ fileList[index]
})
const warrior = (new Loader(folder + 'animations/warrior.fbx', list, 0.01)).getModel()

export default warrior