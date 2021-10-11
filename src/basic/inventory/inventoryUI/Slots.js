import createSlotNumber from './FactoryNumber.js'

let index = 0
class Slot {
    constructor() {
        this.container = document.createElement('div')
        this.slotNumber = createSlotNumber()
        this.slotNumber.classList.add('hide')
        this.container.appendChild(this.slotNumber)
        this.container.classList.add('inventory-slot')
        this.container.id = 'slot' + index;
        index++
        this.container.addEventListener('drop', (e) => {
            this.drop(e)
        })
        this.container.addEventListener('dragover', (e) => {
            e.preventDefault();
        })

        this.finish = false
    }
    get() {
        return this.container
    }
    drop(e) {
        e.preventDefault()
        let data = {}
        data.originSlotId = e.dataTransfer.getData("imgParent")
        data.originSlot = document.getElementById(data.originSlotId)
        data.itemOnDestiny = this.container.querySelector('.inventory-img')
        data.itemOnDestinyId = (data.itemOnDestiny) ? data.itemOnDestiny.id : null
        data.itemOnDestinyIsStacable = false
        if (data.itemOnDestiny) {
            data.itemOnDestinyIsStacable = data.itemOnDestiny.dataset.stackable
            data.itemOnDestinyType = data.itemOnDestiny.name//gold
        }
        
        
        
        data.itemOnOrigin = document.getElementById(e.dataTransfer.getData("img"))
        data.itemOnOriginType = data.itemOnOrigin.name//gold

        let validationList = [
            this.validationSameSlot.bind(this),
            this.validationDiferentItemSuperpositionNotStackable.bind(this),
            this.validationDiferentItemSuperpositionStackable.bind(this)
        ]
        let actionList = [
            this.increaseStackableQuantity.bind(this),
            this.moveItem.bind(this)
            
        ]
        //validation checking
        for (let index = 0; index < validationList.length; index++) {
            validationList[index](data)
            if (this.finish) return
        }

        //actions to checking
        for (let index = 0; index < actionList.length; index++) {
            let bool = actionList[index](data)
            if (bool) {
                return
            }
        }


    }
    validationSameSlot(data) {
        if (this.container.id == data.originSlotId) {
            this.finish = true
        }
    }
    validationDiferentItemSuperpositionNotStackable() {
        if (this.container.children.length == 2 && !data.itemOnDestinyIsStacable) {
            this.finish = true
        }   
    }

    validationDiferentItemSuperpositionStackable() {
        if (this.container.children.length == 2 && data.itemOnDestinyIsStacable && data.itemOnDestinyType != data.itemOnOriginType) {
            this.finish = true
        }
    }


    //actions
    increaseStackableQuantity(data) {
        if (this.container.children.length == 2
            && data.itemOnDestinyIsStacable
            && data.itemOnDestinyType == data.itemOnOriginType) {
            this.container.children[0] = this.container.children[0] * 1 + data.originSlot.children[0] * 1
            data.itemOnOrigin.remove()
            return true
        }
        return false
    }

    moveItem(data){
        if (this.container.children.length == 1){
            this.container.appendChild(data.itemOnOrigin)
            this.slotNumber = data.originSlot.querySelector('.slot-number').innerText
            return true
        }
        return false
    }
}

export default Slot