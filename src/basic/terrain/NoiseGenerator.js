import { noise2 } from "./Perlin.js"

class NoiseGenerator {
    constructor() {
        this.params = {
            octaves: 1,
            exponentiation: 1,
            persistence: 1,
            lacunarity: 1,
            height: 1,
            scale:1
        }
    }
    wrapper(x, y) {
        return noise2(x, y) * 2.0 - 1.0
    }
    perlin2d(x, y) {
        
        const xs = x / this.params.scale;
        const ys = y / this.params.scale;
        let amplitude = 1;
        let frequency = 1;
        let normalization = 0;
        let total = 0
        for (let index = 0; index < this.params.octaves; index++) {
            const noiseValue = this.wrapper(xs * frequency, ys * frequency) * 0.5 + 0.5;
            total += noiseValue * amplitude
            normalization += amplitude;
            amplitude *= this.params.persistence
            frequency *= this.params.lacunarity
        }
        total /= normalization
        let out = Math.pow(total, this.params.exponentiation) * this.params.height
        return out
    }

}

let noiseGenerator = new NoiseGenerator()
export default noiseGenerator