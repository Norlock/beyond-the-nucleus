import { Activate, Deactivate, Selector } from './Selector'

export class SimpleSelector {
    tag: string // Tag for debug readability
    next: SimpleSelector
    activate: Activate
    deactivate: Deactivate

    constructor(tag: string) {
        this.tag = tag

        // placeholders to avoid undefined behaviour
        this.activate = (): Promise<void> => {
            console.warn('activate not implemented ' + tag)
            return
        }

        this.deactivate = (): Promise<void> => {
            console.warn('deactivate not implemented ' + tag)
            return
        }
    }

    append(selector: SimpleSelector): void {
        if (!this.next) {
            this.next = selector
        } else {
            this.next.append(selector)
        }
    }

    insertBefore(selector: SimpleSelector, tag: string): void {
        if (this.next?.tag === tag) {
            selector.next = this.next
            this.next = selector
        } else {
            this.next?.insertBefore(selector, tag)
        }
    }

    insertAfter(selector: SimpleSelector, tag: string): void {
        if (this.tag === tag) {
            selector.next = this.next
            this.next = selector
        } else {
            this.next?.insertAfter(selector, tag)
        }
    }

    // Select first one first
    async recursivelyActivate(): Promise<void> {
        await this.activate()
        await this.next?.recursivelyActivate()
    }

    // Unselect last one first
    async recursivelyDeactivate(): Promise<void> {
        await this.next?.recursivelyDeactivate()
        await this.deactivate()
    }
}
