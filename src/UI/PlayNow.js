let div = null
let getPlayNowModule = () => {
    if(div) return div
    let playNow = `<div class="play-now"><h1>The Warrior</h1><div class="beating1">Play Now</div></div>`
    let tmp = document.createElement('div')
    tmp.innerHTML = playNow
    div = tmp.children[0]
    document.body.appendChild(div)
    return div
}
let fadeout = () =>{
    div.classList.add('fadeout')
}

export default {
    getPlayNowModule,
    fadeout
}