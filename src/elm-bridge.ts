import { Elm } from './Main.elm'

interface TSComponent extends ElmComponent {
    build: () => void
}

interface ElmComponent {
    id: string
    chapterId: string
    next: ElmComponent[]
    previous?: ElmComponent
    index: number
}

export function initElm() {
    const app = Elm.Main.init({
        node: document.getElementById('app')
    })

    app.ports.toJSComponent.subscribe((object: string) => {
        console.log('str1', object)
    })
}
