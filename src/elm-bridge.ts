import { Chapter } from './chapters/base/Chapter'
import { IndigenousChapter } from './chapters/IndigenousChapter'
import { OceanChapter, OceanName } from './chapters/OceanChapter'
import { ZendoChapter } from './chapters/ZendoChapter'
import { Component } from './components/base/Component'
import { OceanPart1 } from './components/ocean/OceanPart1'
import { OceanPart2 } from './components/ocean/OceanPart2'
import { Elm } from './Main.elm'
import { boardApp } from './pixi/PixiApp'
import { Promiser } from './utils/Promiser'

export const components: Map<string, Component> = new Map()
export const chapters: Map<string, Chapter> = new Map()

export interface ComponentBehaviour {
    init(elmData: ElmComponent): void
    idle: () => void
    activate: () => void
    deactivate: () => void
}

export interface ElmComponent {
    id: string
    chapterId: string
    previous: string | null
    next: string[]
    command: string
}

export function initElm() {
    initChapters()

    const app = Elm.Main.init({
        node: document.getElementById('app')
    })

    const loaded = Promiser<void>()

    app.ports.toJSComponent.subscribe((elm: ElmComponent) => {
        loaded.promise.then(() => {
            const component = components.get(elm.id)
            console.log('elm component', component)
            if (component) {
                chapters.get(component.chapterId).selector.select(OceanName.START)
                component.init()
                component.selector.select()
            }
        })
    })

    app.ports.toJSLoadComponents.subscribe((list: ElmComponent[]) => {
        fillComponents(list)
        loaded.resolve()
    })
}

const initChapters = () => {
    const ocean = OceanChapter()
    const zendo = ZendoChapter()
    const indigenous = IndigenousChapter()

    chapters.set(ocean.chapterId, ocean)
    chapters.set(zendo.chapterId, zendo)
    chapters.set(indigenous.chapterId, indigenous)
}

// TODO check if not implemented components are there
const fillComponents = (list: ElmComponent[]) => {
    const pixiCanvas = document.getElementById('pixi-canvas')
    pixiCanvas.appendChild(boardApp.view)

    for (let component of list) {
        if (component.id === 'ocean1') {
            components.set(component.id, OceanPart1(component))
        } else if (component.id === 'ocean2') {
            components.set(component.id, OceanPart2(component))
        }
    }
}

export enum ActionUI {
    TOGGLE_HELP = '?',
    TOGGLE_MUTE = 'm',
    TOGGLE_CANVAS_BLUR = 'blur',
    LEFT = 'ArrowLeft',
    RIGHT = 'ArrowRight',
    UP = 'ArrowUp',
    DOWN = 'ArrowDown'
}

// keys will be passed from Elm
//
//switch (keyPressed) {
//case ActionUI.LEFT:
//boardApp.stage.x += 10
//break
//case ActionUI.RIGHT:
//boardApp.stage.x -= 10
//break
//case ActionUI.UP:
//boardApp.stage.y += 10
//break
//case ActionUI.DOWN:
//boardApp.stage.y -= 10
//break
//}
