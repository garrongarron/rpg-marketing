import loopMachine from "./LoopMachine.js";

let clock = new THREE.Clock();
let delta = 0
let lastN = []
loopMachine.addCallback(() => {
    delta = clock.getDelta()
    lastN.push(delta)
    if (lastN.length > 10) {
        delta = lastN.reduce((a, b) => a + b, 0) / 11;
        lastN.shift()
    }
})
let getDelta = () => {
    return delta
}
export default getDelta