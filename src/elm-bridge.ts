import { Chapter } from './chapters/base/Chapter'
import { IndigenousChapter } from './chapters/IndigenousChapter'
import { OceanChapter, OceanName } from './chapters/OceanChapter'
import { ZendoChapter } from './chapters/ZendoChapter'
import { FlowComponent } from './components/base/FlowComponent'
import { OceanPart1 } from './components/ocean/OceanPart1'
import { OceanPart2 } from './components/ocean/OceanPart2'
import { OceanPart3 } from './components/ocean/OceanPart3'
import { OceanPart4 } from './components/ocean/OceanPart4'
import { Elm } from './Main.elm'
import { boardApp, boardScroll } from './pixi/PixiApp'
import { Promiser } from './utils/Promiser'

export const components: Map<string, FlowComponent> = new Map()
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
            if (!component) {
                console.error("component doesn't exist on JS", elm)
                return
            }

            console.log(elm.command)
            if (elm.command === 'activate') {
                chapters.get(component.chapterId).selector.select(component.containerName)
                component.selector.select()
            } else if (elm.command === 'idle') {
                component.selector.idle()
            } else if (elm.command === 'deactivate') {
                component.selector.unselect()
            }
        })
    })

    app.ports.toJSLoadComponents.subscribe((list: ElmComponent[]) => {
        fillComponents(list)
        loaded.resolve()
    })

    app.ports.toJSScroll.subscribe((direction: string) => {
        boardScroll(direction)
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

    const setComponent = (jsComponent: FlowComponent) => {
        components.set(jsComponent.id, jsComponent)
        jsComponent.init()
    }

    let elmComponent = list.find((x) => x.id === 'ocean1')
    if (elmComponent) {
        setComponent(OceanPart1(elmComponent))
    } else {
        console.error('ocean1 is not found')
    }

    elmComponent = list.find((x) => x.id === 'ocean2')
    if (elmComponent) {
        setComponent(OceanPart2(elmComponent))
    } else {
        console.error('ocean2 is not found')
    }

    elmComponent = list.find((x) => x.id === 'ocean3')
    if (elmComponent) {
        setComponent(OceanPart3(elmComponent))
    } else {
        console.error('ocean3 is not found')
    }

    elmComponent = list.find((x) => x.id === 'ocean4')
    if (elmComponent) {
        setComponent(OceanPart4(elmComponent))
    } else {
        console.error('ocean4 is not found')
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
