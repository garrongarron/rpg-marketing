import loopMachine from "./LoopMachine.js";
import Stats from "./Stats.js";

let stats = new Stats()
document.body.appendChild(stats.dom)

loopMachine.addCallback(()=>{
    stats.update();
})