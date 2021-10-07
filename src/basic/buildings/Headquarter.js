import Loader from "../../basic/Loader.js"


const folder = "src/basic/buildings/"

const list = []

// Object.keys(fileList).forEach((element, index) => {
//     list[index] = folder + 'animations/'+ fileList[index]
// })
const headquarter = (new Loader(folder + 'crusader_headquarter.FBX', list, 0.01)).getModel()

export default headquarter