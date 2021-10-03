const loader = new THREE.TextureLoader()

let folder = 'src/basic/terrain/texture/images/'
let images = 'sand grass rock snow stone sky'.split(' ')

let textureLoader = () => {

    let promises = images.map(fileName => {
        return new Promise((res, rej) => {
            loader.load(
                folder + fileName + '.jpg',
                (textture) => { res(textture) })
        })
    })

    return Promise.all(promises)
}


export default textureLoader