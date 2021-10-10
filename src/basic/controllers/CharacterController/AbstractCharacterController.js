import eventBus, { EventBus } from "../../EventBus.js"
import { KeyListener } from "../../KeyListener.js"
import { LoopMachine } from "../../LoopMachine.js"

class AbstractCharacterController {
    constructor() {
        this.flag = false
        this.state = {}
        this.components = []
        this.eventBus = new EventBus()
        this.loop = new LoopMachine()
        this.keyListener = new KeyListener()
    }
    addComponents(component) {
        component.setController(this)
        this.components.push(component)
    }
    removeComponent(component) {
        let index = this.components.indexOf(component)
        if (index > -1) this.components.splice(index, 1)
    }
    removeComponentByClass(type) {
        this.components.forEach(component => {
            if (component instanceof type) {
                component.stop()
                this.removeComponent(component)
            }
        })
    }
    startComponent(type) {
        this.components.forEach(component => {
            if (component instanceof type)
                component.start()
        })
    }
    stopComponent(type) {
        this.components.forEach(component => {
            if (component instanceof type)
                component.stop()
        })
    }
    getComponentByClass(type) {
        for (let index = 0; index < this.components.length; index++) {
            if (this.components[index] instanceof type){
                return this.components[index]
            }    
        }
    }
    caster = (data) => {
        this.eventBus.dispatch('keyListener', data)
    }
    init(){
        console.log('init');
        this.flag = true
        this.keyListener.setCaster(this.caster)
    }
    start() {
        if(!this.flag) this.init()
        console.log('start');
        this.components.forEach(component => {
            try {
                component.start()
            } catch (error) {
                console.error(component, error);
            }
        })
        this.loop.addCallback(this.#tick)
        this.loop.start()
        this.keyListener.start()
        eventBus.subscribe('keyListener', this.#keyListenerCB)
    }
    #keyListenerCB = (data) => {
        this.eventBus.dispatch('keyListener', data)
    }
    #tick = () => {
        this.components.forEach(component => { component.tick() })
    }
    stop() {
        console.log('stop');
        this.keyListener.stop()
        eventBus.unSubscribe('keyListener', this.#keyListenerCB)
        this.components.forEach(component => { component.stop() })
        this.loop.removeCallback(this.#tick)
        this.loop.stop()
    }
}

export default AbstractCharacterController