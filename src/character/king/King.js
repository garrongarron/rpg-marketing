import Loader from "../../basic/Loader.js"


const folder = "./src/character/king/"
let fileList = {
    '0':'zombie idle.fbx', //sword and shield idle.fbx'
    '1':'zombie death.fbx',
    '2':'zombie dying.fbx',
    '3':'zombie crawl.fbx',
    // '3':'sword and shield run.fbx',
    // '4':'sword and shield run (2).fbx',
}
const list = []

Object.keys(fileList).forEach((element, index) => {
    list[index] = folder + 'animations/'+ fileList[index]
})
const king = (new Loader(folder + 'animations/knight_d_pelegrini.fbx', list, 0.01 *0.8)).getModel()

export default king