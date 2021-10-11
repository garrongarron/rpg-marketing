import Grid from './Grid.js'
import imageFactory from './ImageFactory.js'
import tooltip from './Tooltip.js'
class InventorySystem
{
    show(){
        let inveintory = new Grid()
        inveintory.show()
        
        let grid = new Grid()

        grid.show()
        let img = imageFactory.getOneImage(imageFactory.list().gold)
        tooltip.setDescription(img, imageFactory.list().gold.description)
        grid.get(1).appendChild(img);
        grid.get(1).classList.add('fountain-of-resources')
        grid.get(0).classList.add('rubbish-bin')

    }
    hide(){
        grid.hide()
    }
}
let inventorySystem = new InventorySystem()

export default inventorySystem


