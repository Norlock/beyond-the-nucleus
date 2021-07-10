import { Selector } from 'src/modules/selector/Selector'

class Current {
    name: string
    selector: Selector

    constructor(name: string, selector: Selector) {
        this.name = name
        this.selector = selector
    }
}

export class ContainerSelector {
    selectorMap: Map<string, Selector> = new Map()
    current = new Current('', undefined)

    select(name: string): void {
        if (name !== this.current.name && this.selectorMap.has(name)) {
            const selector = this.selectorMap.get(name)
            selector.select()
            this.current.selector?.unselect()
            this.current = new Current(name, selector)
        }
    }

    addSelector(name: string, selector: Selector): void {
        this.selectorMap.set(name, selector)
    }
}
