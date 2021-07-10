import { Chapter } from './chapters/base/Chapter'
import { Component } from './components/base/Component'
import { OceanPart1 } from './components/ocean/OceanPart1'
import { Elm } from './Main.elm'
import { LOG } from './utils/Logger'

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
    const app = Elm.Main.init({
        node: document.getElementById('app')
    })

    fillComponents([])

    app.ports.toJSComponent.subscribe((component: ElmComponent) => {
        console.log('elm component', component)
    })
}

const fillComponents = (list: ElmComponent[]) => {
    const ocean1 = list.find((x) => x.id === 'ocean1')
    if (ocean1) {
        OceanPart1(ocean1)
    } else {
        console.error('component ocean1 is not implemented in Elm')
    }

    const ocean2 = list.find((x) => x.id === 'ocean2')
    if (ocean2) {
        OceanPart1(ocean2)
    } else {
        console.error('component ocean1 is not implemented in Elm')
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
