
import Grid from "./inventoryUI/Grid.js"
// import './inventoryUI/InveontoryUI.scss'
// import gold from '../images/gold.png'
import imageFactory from "./inventoryUI/ImageFactory.js"
import tooltip from "./inventoryUI/Tooltip.js"


let gold = 'src/basic/inventory/inventoryUI/images/gold.png'
class Inventory {
    constructor() {
        this.db = {}
        this.inverTypes = {}

        this.types = {
            gold: 1,
            food: 2
        }

        Object.assign(this.inverTypes, ...Object.entries(this.types).map(([a, b]) => ({ [b]: a })))
        //grid
        this.grid = new Grid()


        //css
        let style = document.createElement('style')
        style.innerHTML = `.fountain-of-resources{background-image: url(${gold});}`
        document.head.appendChild(style)

        this.n = 0
    }
    start() {
        tooltip.show()
        tooltip.hide()
        this.grid.show()
    }
    stop() {
        tooltip.hide()
        this.grid.hide()
    }
    addItem(quantity, type) {
        if (!Object.keys(this.types).includes(this.inverTypes[type])) {
            console.error('Type does not exist');
            return
        }
        if (!Number.isInteger(quantity)) {
            console.error('Quantity is not an Integer');
            return
        }
        if (this.db[this.inverTypes[type]] == undefined) {
            this.db[this.inverTypes[type]] = 0
        }
        this.db[this.inverTypes[type]] += quantity

        //add element on UI
        let img = imageFactory.getOneImage(imageFactory.list().gold)
        tooltip.setDescription(img, imageFactory.list().gold.description)
        if (this.grid.get(this.n)){
            this.grid.get(this.n).appendChild(img);
            console.log(this.grid.get(this.n));
            this.grid.get(this.n).querySelector('.inventory-slot-number').innerText = this.db[this.inverTypes[type]]
            this.n++
        } 
        
    }
}

const inventory = new Inventory()

export default inventory
