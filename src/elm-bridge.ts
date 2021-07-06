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
}

function componentsList() {
    const component1: ElmComponent = {
        id: 'ocean1',
        chapterId: 'Ocean',
        next: [],
        index: 1
    }

    const component2: ElmComponent = {
        id: 'ocean2',
        chapterId: 'Ocean',
        next: [],
        index: 2
    }
    const component3: ElmComponent = {
        id: 'ocean1',
        chapterId: 'Ocean',
        next: [],
        index: 3
    }
    const component4: ElmComponent = {
        id: 'ocean1',
        chapterId: 'Ocean',
        next: [],
        index: 1
    }

    addComponent(component1, component2, component3, component4)
}

class ComponentList {
    head: ElmComponent
}

const components = new ComponentList()

const addComponent = (...items: ElmComponent[]) => {
    const add = (component: ElmComponent) => {
        if (!components.head) {
            components.head = component
        } else {
            let current = components.head
            while (0 < current.next.length) {
                current = current.next[0]
            }

            current.next.push(component)
            component.previous = current
        }
    }

    for (let component of items) {
        add(component)
    }
}
