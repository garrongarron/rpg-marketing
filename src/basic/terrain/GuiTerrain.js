import { GUI } from "../dat.gui.module.js";
import noiseGenerator from "./NoiseGenerator.js";
import params from "./Params.js";
import terrain from "./Terrain.js";

const panel = new GUI({ width: 310 });
const folder1 = panel.addFolder( 'Noise 1' );

folder1.add(noiseGenerator.params, 'octaves', 0.0, 10, 1).listen().onChange(() => { terrain.updateAgain() })
folder1.add(noiseGenerator.params, 'exponentiation', 1, 10, 0.01).listen().onChange(() => terrain.updateAgain())
folder1.add(noiseGenerator.params, 'persistence', 0.0, 1, 0.01).listen().onChange(() => terrain.updateAgain())
folder1.add(noiseGenerator.params, 'lacunarity', 0.0, 10, 0.01).listen().onChange(() => terrain.updateAgain())
folder1.add(noiseGenerator.params, 'height', 0.0, 200, 1).listen().onChange(() => terrain.updateAgain())
folder1.add(noiseGenerator.params, 'scale', 0.0, 150, 0.01).listen().onChange(() => terrain.updateAgain())

const folder2 = panel.addFolder( 'Noise 2' );
folder2.add(params.config2, 'octaves', 0.0, 10, 1).listen().onChange(() => { terrain.updateAgain() })
folder2.add(params.config2, 'exponentiation', 1, 10, 0.01).listen().onChange(() => terrain.updateAgain())
folder2.add(params.config2, 'persistence', 0.0, 1, 0.01).listen().onChange(() => terrain.updateAgain())
folder2.add(params.config2, 'lacunarity', -10.0, 10, 0.01).listen().onChange(() => terrain.updateAgain())
folder2.add(params.config2, 'height', 0.0, 200, 1).listen().onChange(() => terrain.updateAgain())
folder2.add(params.config2, 'scale', 0.0, 100, 0.01).listen().onChange(() => terrain.updateAgain())
folder2.add(params.config2, 'finalHeight', 0.0, 1, 0.01).listen().onChange(() => terrain.updateAgain())
folder2.add(params.config2, 'displacementX', -100, 100, 1).listen().onChange(() => terrain.updateAgain())
folder2.add(params.config2, 'displacementZ', -100, 100, 1).listen().onChange(() => terrain.updateAgain())

folder1.open()
folder2.open()