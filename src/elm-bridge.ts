import { Chapter } from './chapters/base/Chapter'
import { Component } from './components/base/Component'
import { Elm } from './Main.elm'

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

    app.ports.toJSComponent.subscribe((component: ElmComponent) => {
        console.log('elm component', component)
    })
}
