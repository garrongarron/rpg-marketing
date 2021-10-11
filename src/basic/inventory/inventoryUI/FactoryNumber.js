let createSlotNumber = () => {
    let number = document.createElement('span')
    number.classList.add('inventory-slot-number')
    number.innerText = '0'
    return number
}
export default createSlotNumber