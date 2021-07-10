import { Elm } from './Main.elm'

interface TSComponent {
    build: () => void
}

interface ElmComponent {
    id: string
    chapterId: string
    previous?: string
    command: string
}

export function initElm() {
    const app = Elm.Main.init({
        node: document.getElementById('app')
    })

    app.ports.toJSComponent.subscribe((object: string) => {
        console.log('str1', object)
    })
}
