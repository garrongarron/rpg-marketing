import Loader from "../../basic/Loader.js"


const folder = "./src/character/castleguard/"
let fileList = {
    '0':'Talking.fbx', //sword and shield idle.fbx'
    '1':'patada.fbx'
}
const list = []

Object.keys(fileList).forEach((element, index) => {
    list[index] = folder + 'animations/'+ fileList[index]
})
const castleguard = (new Loader(folder + 'animations/patada.fbx', list, 0.01)).getModel()

export default castleguard