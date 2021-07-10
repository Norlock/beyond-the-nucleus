import { ContainerSelector } from 'src/chapters/base/ContainerSelector'

export interface SelectorModule {
    selector: Selector
}

export enum StandardSelectorTag {
    FLOW = 'flow',
    CARD = 'card',
    LINE = 'line'
}

export class Selector {
    tag: string // Tag for debug readability
    isSelected: boolean
    next: Selector
    select: Select
    unselect: Unselect

    constructor(tag: string) {
        this.tag = tag
    }

    append(selector: Selector): void {
        if (!this.next) {
            this.next = selector
        } else {
            this.next.append(selector)
        }
    }

    insertBefore(selector: Selector, tag: string): void {
        if (this.next?.tag === tag) {
            selector.next = this.next
            this.next = selector
        } else {
            this.next?.insertBefore(selector, tag)
        }
    }

    insertAfter(selector: Selector, tag: string): void {
        if (this.tag === tag) {
            selector.next = this.next
            this.next = selector
        } else {
            this.next?.insertAfter(selector, tag)
        }
    }

    // Select first one first
    async recursivelySelect(): Promise<void> {
        await this.select()
        await this.next?.recursivelySelect()
    }

    // Unselect last one first
    async recursivelyUnselect(): Promise<void> {
        await this.next?.recursivelyUnselect()
        await this.unselect()
    }
}

export class ChapterSelector extends Selector {
    containerSelector = new ContainerSelector()
    chapterSelect: ChapterSelect
}

export type Select = () => Promise<void>
export type ChapterSelect = (containerName: string) => Promise<void>
export type Unselect = () => Promise<void>
