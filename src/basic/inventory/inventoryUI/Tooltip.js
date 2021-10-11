import cache from "../../Cache.js"

class Tooltip {
    constructor() {
        let tooltip = document.createElement('div')
        tooltip.classList.add('inventory-tooltip')
        this.container = tooltip
    }
    show(string) {
        this.container.innerText = string
        document.body.appendChild(this.container)
    }
    hide() {
        cache.appendChild(this.container)
    }

    setDescription(img, description){
        img.addEventListener('mouseover',(e)=>{
            this.show(description)
        })
        img.addEventListener('mouseout',(e)=>{
            this.hide()
        })
    }
}

let tooltip = new Tooltip()

export default tooltip;
