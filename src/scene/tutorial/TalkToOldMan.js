import dialogSystem from "../../basic/dialogsystem/DialogSystem.js"
import eventBus from "../../basic/EventBus.js"
import loopMachine, { LoopMachine } from "../../basic/LoopMachine.js"
import soundHandler from "../../basic/sound/SoundHandler.js"
import warrior from "../../character/warrior/Warrior.js"
import instructionContainer from "../../UI/compoment/InstructionContainer.js"
import { progressBar } from "../../UI/compoment/ProgressBar.js"
import wellDone from "../../UI/compoment/WellDone.js"

class TalkToOldMan {
    constructor() {
        this.warrior = null
        this.handred = 12
        this.loop = null
    }
    start() {
        this.loop = LoopMachine.store['TutorialGame']
        warrior.then(mesh => {
            this.warrior = mesh
            setTimeout(() => {
                document.querySelector('body').appendChild(progressBar.node)
                this.init()
            }, 1000);
        })
    }
    init() {
        this.loop.addCallback(this.check)
    }
    check = () => {
        if (this.warrior.position.z * 1 < 1) {
            soundHandler.play('plim')
            this.stop()
            eventBus.dispatch('talkToOldMan', true)
            // instructionContainer.node.classList.remove('fadeIn1')
            let state = {}
            state.title = 'Anciano'
            state.message = 'Guerrero! Bienvenido a nuestras tierras.<a href="#">Leer mas</a>'
            state.button = 'Continuar'
            wellDone.update(state)
            this.update(wellDone.node.querySelector('a'))
            document.querySelector('body').appendChild(wellDone.node)
            wellDone.setEventName('talkToOldMan')
            setTimeout(() => {
                wellDone.node.classList.add('fadeIn1')
            }, 100);
        }
    }
    update(node){
        
        dialogSystem.loadContent( [
            ['Anciano', 'Buenos días caballero. Bienvenido a las tierras de "Javascript".'],
            ['Guerrero', 'Buenos días señor. Gracias. El paisaje de "Javascript" es hermoso. Los lagos y las montanias están preciosas.'],
            ['Anciano', 'Así es. Pero ultimamente no podemos disfrutar ni de los paisajes ni las bondades de "Javascript".'],
            ['Anciano', 'Lamentablemente estamos padeciendo tormentos.'],
            ['Anciano', 'La tiranía del Rey Unity y su esposa Unreal han devastado nuestras aldeas.'],
            ['Anciano', 'Ya no permiten realizar VideoJuegos en "Javascript".'],
            ['Guerrero', 'Oh! Lamento mucho oir eso señor.'],
            ['Guerrero', 'Todo el mundo sabe que se pueden hacer muy buenos Videojuegos en "Javascript".'],
            ['Guerrero', 'Si el Rey Unity ha prohibido realizar Videojuegos en "Javascript" lo declaro mi enemigo desde hoy mismo.'],
            ['Guerrero', 'Yo soy un guerrero y mi naturaleza es pelear.'],
            ['Guerrero', 'Si alguien prohibe hacer juegos en "Javascript" no lo toleraré y daré muerte a quien la merezca.'],
            ['Guerrero', '¿Sabes si alguien se ha revelado contra el Rey Unity?'],
            ['Anciano', 'Muchos lo han intentado, pero mueren al ingresar al castillo protegido por el dragón.'],
            ['Anciano', 'Necesitamos alguien que aniquile al Rey Unity.'],
            ['Anciano', 'Pero no hubo hombre capaz de atravezar los muros del castillo del Rey que salga vivo.'],
            ['Guerrero', 'Yo lo haré. Lo juro por mis dioses y mi amada Dulcinea Konypyon.'],
            ['Anciano', 'No será tarea fácil. Además del dragón, hay muchos guardias en el castillo.'],
            ['Guerrero', 'Me infiltraré en el castillo, daré muerte al Rey Unity y comeremos dragón con papas esta noche.'],
            ['Guerrero', '¡Lo juro! ¡Como que me llamo Alva Majo!'],
            ['Guerrero', 'Desarrollador de Videojuegos indie.'],
            ['Guerrero', 'Dime donde está el castillo. Te lo ordeno.'],
            ['Anciano', 'El castillo está detrás de las siete colinas.'],
            ['Anciano', 'Avisaré a los mercaderes del pueblo que tu irás. Tal vez puedan ayudarte a ingresar al castillo.'],
        ])
        node.addEventListener('click',()=>{
            dialogSystem.open()
            // node.parentNode.parentNode.querySelector('button').click()
        })
        // dialogSystem.addCloseCallback(()=>{
        //     eventBus.dispatch('talkToOldMan', false)
        // })
    }
    stop() {
        dialogSystem.close()
        this.loop.removeCallback(this.check)
    }
}

const talkToOldMan = new TalkToOldMan()

export default talkToOldMan