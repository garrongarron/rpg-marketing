import noiseGenerator from "./NoiseGenerator.js"

let params = {
    'config1': {
        noiseType: 'perlin',
        scale: 100,
        octaves: 1,
        persistence: .22,
        lacunarity: 4.9,//6.9,
        exponentiation: 5.8,
        seed: 1,
        height: 150
    },
    'config2': {
        noiseType: 'perlin',
        scale: 1,
        octaves: 1,
        persistence: 1,
        lacunarity: 1,//6.9,
        exponentiation: 1,
        seed: 1,
        height: 1,
        finalHeight: 1,
        displacementX: 1,
        displacementZ: 1
    },
    filters: null,
    'customNoiseGenerator': (x, y) => {
        let out = noiseGenerator.perlin2d(x, y) + noiseGenerator.perlin2d(
            x + params.config2.displacementX,
            y + params.config2.displacementZ,
            params.config2
        ) * params.config2.finalHeight * 0
        if(params.filters){
            out = params.filters(x, y, out)
        }
        return out
    }
}
noiseGenerator.params = params.config1
window.params = params
export default params