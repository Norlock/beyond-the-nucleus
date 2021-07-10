import { Selector } from 'src/modules/selector/Selector'

export class ContainerSelector {
    selectorMap: Map<string, Selector> = new Map()
    current = ''

    select(name: string): void {
        if (name !== this.current && this.selectorMap.has(name)) {
            const selector = this.selectorMap.get(name)
            selector.select()
            this.selectorMap.get(this.current)?.unselect()
            this.current = name
        }
    }

    addSelector(name: string, selector: Selector): void {
        this.selectorMap.set(name, selector)
    }
}
