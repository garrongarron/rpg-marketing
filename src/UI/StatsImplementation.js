import Stats from "../../js/Stats.js";
import loopMachine from "../basic/LoopMachine.js";


if(localStorage.getItem('stats')){
    let stats = new Stats()
    document.body.appendChild(stats.dom)
    
    loopMachine.addCallback(()=>{
        stats.update();
    })
}
