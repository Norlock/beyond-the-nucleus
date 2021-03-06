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
    next: Selector
    activate: Activate
    deactivate: Deactivate
    idle: Idle

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

        this.idle = (): Promise<void> => {
            console.warn('idle not implemented ' + this.tag)
            return
        }
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
    async recursivelyActivate(): Promise<void> {
        await this.activate()
        await this.next?.recursivelyActivate()
    }

    // Unselect last one first
    async recursivelyDeactivate(): Promise<void> {
        await this.next?.recursivelyDeactivate()
        await this.deactivate()
    }

    // Select first one first
    async recursivelyIdle(): Promise<void> {
        await this.idle()
        await this.next?.recursivelyIdle()
    }
}

export type Activate = () => Promise<void>
export type Deactivate = () => Promise<void>
export type Idle = () => Promise<void>
