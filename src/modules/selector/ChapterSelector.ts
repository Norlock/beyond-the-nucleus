import { ContainerSelector } from 'src/chapters/base/ContainerSelector'
import { Selector } from './Selector'

export class ChapterSelector {
    readonly tag: string
    readonly containerSelector: ContainerSelector

    next?: Selector

    constructor(tag: string) {
        this.tag = tag
        this.containerSelector = new ContainerSelector()
    }

    select: (containerName: string) => Promise<void>
    unselect: () => Promise<void>

    append(selector: Selector): void {
        if (!this.next) {
            this.next = selector
        } else {
            this.next.append(selector)
        }
    }
}
