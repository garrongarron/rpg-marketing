import btnTutorial from "./BtnTutorialFromIntro.js"

class Story {
    constructor() {
        this.flag = false
        this.container = document.createElement('div')
    }
    init() {
        this.p = document.createElement('p')
        this.container.classList.add('shining')
        this.listText = [
            'Hace mucho tiempo atras...',
            '...en una tierra lejana...',
            '...un valiente gerrero llamado Alva...',
            '...lucho una batalla epica...',
            '...buscando la liberacion de su pueblo...'
        ]
        this.container.appendChild(this.p)
        document.body.appendChild(this.container)
    }
    start() {
        console.log('story starting');
        if(!this.flag) this.init()
        let n = setInterval(() => {
            this.p.classList.remove('gradient')
            setTimeout(() => {
                this.p.innerText = this.listText.shift()
                if(this.p.innerText == 'undefined'){
                    let tmp = document.createElement('div')
                    tmp.appendChild(this.p)
                    clearInterval(n)
                    btnTutorial()
                } else {
                    this.p.classList.add('gradient')    
                }
            }, 100);
        }, 2900);
        this.p.innerText = this.listText.shift()
        this.p.classList.add('gradient') 
        
    }
    stop() { }
}

const story = new Story()

export default story