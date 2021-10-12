let sceneList =  {
    get landingScene() { return lazy('landingScene') },
    get tutorialScene() { return lazy('tutorialScene') },
    get frontCastleScene() { return lazy('frontCastleScene') }
}
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
let lazy = async (filename) => {
    let module = await import(`../../scene/${capitalize(filename)}.js`)
    return module.default
}
// let sceneList = new SceneGetList()

export default sceneList