import { Selector } from './Selector'

export interface ChapterSelector {
    readonly tag: string
    readonly selectorMap: Map<string, Selector>

    current: string
    next?: Selector
    isSelected: boolean
    activate(): void
    selectContainer(name: string): void
    deactivate(): void
    addSelector(name: string, selector: Selector): void
    append(selector: Selector): void
}
