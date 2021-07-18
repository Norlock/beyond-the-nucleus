import { Chapter } from './chapters/base/Chapter'
import { IndigenousChapter } from './chapters/IndigenousChapter'
import { OceanChapter } from './chapters/OceanChapter'
import { ZendoChapter } from './chapters/ZendoChapter'
import { FlowComponent } from './components/base/FlowComponent'
import { GameComponent } from './components/base/GameComponent'
import { OceanPart1 } from './components/ocean/OceanPart1'
import { OceanPart2 } from './components/ocean/OceanPart2'
import { OceanPart3 } from './components/ocean/OceanPart3'
import { OceanPart4 } from './components/ocean/OceanPart4'
import { OceanPart5 } from './components/ocean/OceanPart5'
import { OceanPart6 } from './components/ocean/OceanPart6'
import { ZendoPart1 } from './components/zendo/ZendoPart1'
import { ZendoPart2 } from './components/zendo/ZendoPart2'
import { ZendoPart3 } from './components/zendo/ZendoPart3'
import { ZendoPart4 } from './components/zendo/ZendoPart4'
import { ZendoPart5 } from './components/zendo/ZendoPart5'
import { ZendoPart6 } from './components/zendo/ZendoPart6'
import { Elm } from './Main.elm'
import { boardApp, boardScroll } from './pixi/PixiApp'
import { Promiser } from './utils/Promiser'

export const components: Map<string, FlowComponent> = new Map()
export const chapters: Map<string, Chapter> = new Map()

export interface ElmComponent {
    id: string
    chapterId: string
    containerName: string
    previous: string | null
    next: string[]
    command: string
}

interface ComponentCommand {
    id: string
    command: string
}

interface ChapterCommand {
    chapterId: string
    containerName: string
    command: string
}

const ACTIVATE = 'activate'
const DEACTIVATE = 'deactivate'
const IDLE = 'idle'
const START_GAME = 'start'
const INIT = 'init'
const SELECT = 'select'
const STORAGE_KEY = 'current_component'
let app: any

export function initElm() {
    initChapters()

    app = Elm.Main.init({
        node: document.getElementById('app'),
        flags: window.localStorage.getItem(STORAGE_KEY)
    })

    const loaded = Promiser<void>()

    app.ports.toJSComponent.subscribe((command: ComponentCommand) => {
        loaded.promise.then(() => {
            const component = components.get(command.id)
            if (!component) {
                console.error("component doesn't exist on JS", command)
                return
            }

            if (command.command === ACTIVATE) {
                window.localStorage.setItem(STORAGE_KEY, command.id)
                component.selector.activate()
            } else if (command.command === IDLE) {
                component.selector.idle()
            } else if (command.command === DEACTIVATE) {
                component.selector.deactivate()
            } else if (command.command === START_GAME) {
                setTimeout(() => {
                    ;(component as GameComponent).game.init()
                }, 2000)
            }
        })
    })

    app.ports.toJSChapter.subscribe((data: ChapterCommand) => {
        const chapter = chapters.get(data.chapterId)
        if (!chapter) {
            console.error("chapter doesn't exist on JS", data)
            return
        }

        if (data.command === ACTIVATE) {
            chapter.selector.activate()
        } else if (data.command === DEACTIVATE) {
            chapter.selector.deactivate()
        } else if (data.command === SELECT) {
            chapter.selector.selectContainer(data.containerName)
        }
    })

    app.ports.toJSLoadComponents.subscribe((list: ElmComponent[]) => {
        fillComponents(list)
        loaded.resolve()
    })

    app.ports.toJSScroll.subscribe((direction: string) => {
        boardScroll(direction)
    })
}

export function stopGame(): void {
    app.ports.toElmStopGame.send('')
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

    const errorMsg = (id: string): string => {
        return id + ' is not found on the Elm side'
    }

    let elmComponent = list.find((x) => x.id === 'ocean1')
    if (elmComponent) {
        setComponent(OceanPart1(elmComponent))
    } else {
        errorMsg('ocean1')
    }

    elmComponent = list.find((x) => x.id === 'ocean2')
    if (elmComponent) {
        setComponent(OceanPart2(elmComponent))
    } else {
        errorMsg('ocean2')
    }

    elmComponent = list.find((x) => x.id === 'ocean3')
    if (elmComponent) {
        setComponent(OceanPart3(elmComponent))
    } else {
        errorMsg('ocean3')
    }

    elmComponent = list.find((x) => x.id === 'ocean4')
    if (elmComponent) {
        setComponent(OceanPart4(elmComponent))
    } else {
        errorMsg('ocean3')
    }

    elmComponent = list.find((x) => x.id === 'ocean5')
    if (elmComponent) {
        setComponent(OceanPart5(elmComponent))
    } else {
        errorMsg('ocean3')
    }

    elmComponent = list.find((x) => x.id === 'ocean6')
    if (elmComponent) {
        setComponent(OceanPart6(elmComponent))
    } else {
        errorMsg('ocean3')
    }

    elmComponent = list.find((x) => x.id === 'zendo1')
    if (elmComponent) {
        setComponent(ZendoPart1(elmComponent))
    } else {
        errorMsg('ocean3')
    }

    elmComponent = list.find((x) => x.id === 'zendo2')
    if (elmComponent) {
        setComponent(ZendoPart2(elmComponent))
    } else {
        errorMsg('ocean3')
    }

    elmComponent = list.find((x) => x.id === 'zendo3')
    if (elmComponent) {
        setComponent(ZendoPart3(elmComponent))
    } else {
        errorMsg('ocean3')
    }

    elmComponent = list.find((x) => x.id === 'zendo4')
    if (elmComponent) {
        setComponent(ZendoPart4(elmComponent))
    } else {
        errorMsg('ocean3')
    }

    elmComponent = list.find((x) => x.id === 'zendo5')
    if (elmComponent) {
        setComponent(ZendoPart5(elmComponent))
    } else {
        errorMsg('ocean3')
    }

    elmComponent = list.find((x) => x.id === 'zendo6')
    if (elmComponent) {
        setComponent(ZendoPart6(elmComponent))
    } else {
        errorMsg('ocean3')
    }
}
