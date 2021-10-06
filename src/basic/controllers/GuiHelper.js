import { GUI } from "../dat.gui.module.js";

class GuiHelper {
    constructor() {
        
    }
    start(target) {

        setTimeout(() => {
            this.panel = new GUI({ width: 310 });
            const folder1 = this.panel.addFolder('Move');
            let x = target.position.x*1
            let y = target.position.y*1
            let z = target.position.z*1
            folder1.add(target.position, 'x', x - 1.5, x + 1.5, .1)
            folder1.add(target.position, 'y', y - 1.5, y + 1.5, .1)
            folder1.add(target.position, 'z', z - 1.5, z + 1.5, .1)
            folder1.open()
        }, 4000);
    }
    stop() {

    }
}

const guiHelper = new GuiHelper()

export default guiHelper