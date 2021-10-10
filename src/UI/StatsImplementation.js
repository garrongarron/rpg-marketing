import Stats from "../../js/Stats.js";
import loopMachine from "../basic/LoopMachine.js";


let stats = new Stats()
document.body.appendChild(stats.dom)

loopMachine.addCallback(()=>{
    stats.update();
})