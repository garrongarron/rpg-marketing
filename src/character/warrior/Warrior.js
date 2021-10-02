import Loader from "../../basic/Loader.js"


const folder = "./src/character/warrior/"
let fileList = {
    '0':'sword and shield idle (4).fbx' //sword and shield idle.fbx'
}
const list = []

Object.keys(fileList).forEach((element, index) => {
    list[index] = folder + 'animations/'+ fileList[index]
})
const warrior = (new Loader(folder + 'animations/untitled.fbx', list, 0.01)).getModel()

export default warrior