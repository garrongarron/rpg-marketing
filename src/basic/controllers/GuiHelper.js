import { GUI } from "../dat.gui.module.js";

class GuiHelper {
    constructor() { 
        this.panel = new GUI({ width: 310 });
    }
    start(target) {
        const folder1 = this.panel.addFolder('Move');
        folder1.add(target.position, 'x', -10, 10, .1)
        folder1.add(target.position, 'y', -10, 10, .1)
        folder1.add(target.position, 'z', -10, 10, .1)
        folder1.open()
    }
    stop() {
        
    }
}

const guiHelper = new GuiHelper()

export default guiHelper