import { Chapter } from './chapters/base/Chapter'
import { IndigenousChapter } from './chapters/IndigenousChapter'
import { OceanChapter } from './chapters/OceanChapter'
import { SpaceChapter } from './chapters/SpaceChapter'
import { ZendoChapter } from './chapters/ZendoChapter'
import { Component } from './components/base/Component'
import { GameComponent } from './components/base/GameComponent'
import { OceanPart1 } from './components/ocean/OceanPart1'
import { OceanPart2 } from './components/ocean/OceanPart2'
import { OceanPart3 } from './components/ocean/OceanPart3'
import { OceanPart4 } from './components/ocean/OceanPart4'
import { OceanPart5 } from './components/ocean/OceanPart5'
import { OceanPart6 } from './components/ocean/OceanPart6'
import { SpacePart1 } from './components/space/SpacePart1'
import { SpacePart2 } from './components/space/SpacePart2'
import { SpacePart3 } from './components/space/SpacePart3'
import { SpacePart4 } from './components/space/SpacePart4'
import { SpacePart5 } from './components/space/SpacePart5'
import { ZendoPart1 } from './components/zendo/ZendoPart1'
import { ZendoPart2 } from './components/zendo/ZendoPart2'
import { ZendoPart3 } from './components/zendo/ZendoPart3'
import { ZendoPart4 } from './components/zendo/ZendoPart4'
import { ZendoPart5 } from './components/zendo/ZendoPart5'
import { ZendoPart6 } from './components/zendo/ZendoPart6'
import { Elm } from './Main.elm'
import { boardApp, boardScroll } from './pixi/PixiApp'
import { Promiser } from './utils/Promiser'

export const components: Map<string, Component> = new Map()
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
        loaded.promise.then(() => {
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
    })

    app.ports.toJSLoadComponents.subscribe((list: ElmComponent[]) => {
        initChapters()
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
    //const space = SpaceChapter()
    const space = SpaceChapter()

    chapters.set(ocean.chapterId, ocean)
    chapters.set(zendo.chapterId, zendo)
    chapters.set(indigenous.chapterId, indigenous)
    chapters.set(space.chapterId, space)
}

// TODO check if not implemented components are there
const fillComponents = (list: ElmComponent[]) => {
    const pixiCanvas = document.getElementById('pixi-canvas')
    pixiCanvas.appendChild(boardApp.view)

    const setComponent = (jsComponent: Component) => {
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
        errorMsg('ocean4')
    }

    elmComponent = list.find((x) => x.id === 'ocean5')
    if (elmComponent) {
        setComponent(OceanPart5(elmComponent))
    } else {
        errorMsg('ocean5')
    }

    elmComponent = list.find((x) => x.id === 'ocean6')
    if (elmComponent) {
        setComponent(OceanPart6(elmComponent))
    } else {
        errorMsg('ocean6')
    }

    elmComponent = list.find((x) => x.id === 'zendo1')
    if (elmComponent) {
        setComponent(ZendoPart1(elmComponent))
    } else {
        errorMsg('zendo1')
    }

    elmComponent = list.find((x) => x.id === 'zendo2')
    if (elmComponent) {
        setComponent(ZendoPart2(elmComponent))
    } else {
        errorMsg('zendo2')
    }

    const ZENDO3 = 'zendo3'
    elmComponent = list.find((x) => x.id === ZENDO3)
    if (elmComponent) {
        setComponent(ZendoPart3(elmComponent))
    } else {
        errorMsg(ZENDO3)
    }

    const ZENDO4 = 'zendo4'
    elmComponent = list.find((x) => x.id === ZENDO4)
    if (elmComponent) {
        setComponent(ZendoPart4(elmComponent))
    } else {
        errorMsg(ZENDO4)
    }

    const ZENDO5 = 'zendo5'
    elmComponent = list.find((x) => x.id === ZENDO5)
    if (elmComponent) {
        setComponent(ZendoPart5(elmComponent))
    } else {
        errorMsg(ZENDO5)
    }

    const ZENDO6 = 'zendo6'
    elmComponent = list.find((x) => x.id === ZENDO6)
    if (elmComponent) {
        setComponent(ZendoPart6(elmComponent))
    } else {
        errorMsg(ZENDO6)
    }

    const SPACE1 = 'space1'
    elmComponent = list.find((x) => x.id === SPACE1)
    if (elmComponent) {
        setComponent(SpacePart1(elmComponent))
    } else {
        errorMsg(SPACE1)
    }

    const SPACE2 = 'space2'
    elmComponent = list.find((x) => x.id === SPACE2)
    if (elmComponent) {
        setComponent(SpacePart2(elmComponent))
    } else {
        errorMsg(SPACE2)
    }

    const SPACE3 = 'space3'
    elmComponent = list.find((x) => x.id === SPACE3)
    if (elmComponent) {
        setComponent(SpacePart3(elmComponent))
    } else {
        errorMsg(SPACE3)
    }

    const SPACE4 = 'space4'
    elmComponent = list.find((x) => x.id === SPACE4)
    if (elmComponent) {
        setComponent(SpacePart4(elmComponent))
    } else {
        errorMsg(SPACE4)
    }

    const SPACE5 = 'space5'
    elmComponent = list.find((x) => x.id === SPACE5)
    if (elmComponent) {
        setComponent(SpacePart5(elmComponent))
    } else {
        errorMsg(SPACE4)
    }
}
