import { GUI } from "../dat.gui.module.js";
import noiseGenerator from "./NoiseGenerator.js";
import params from "./Params.js";
import terrain from "./Terrain.js";

const panel = new GUI({ width: 310 });
// const panel = panel.addFolder( 'Base Actions' );
noiseGenerator.params = params
panel.add(noiseGenerator.params, 'octaves', 0.0, 10, 1).listen().onChange(() => { terrain.updateAgain() })
panel.add(noiseGenerator.params, 'exponentiation', 1, 10, 0.01).listen().onChange(() => terrain.updateAgain())
panel.add(noiseGenerator.params, 'persistence', 0.0, 1, 0.01).listen().onChange(() => terrain.updateAgain())
panel.add(noiseGenerator.params, 'lacunarity', 0.0, 10, 0.01).listen().onChange(() => terrain.updateAgain())
panel.add(noiseGenerator.params, 'height', 0.0, 200, 1).listen().onChange(() => terrain.updateAgain())
panel.add(noiseGenerator.params, 'scale', 0.0, 150, 0.01).listen().onChange(() => terrain.updateAgain())
