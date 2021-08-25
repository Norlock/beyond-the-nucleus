import { boardApp } from 'src/pixi/PixiApp'
import { Selector } from './Selector'
import * as PIXI from 'pixi.js'
import { ChapterSelector } from './ChapterSelector'

export class PixiChapterSelector implements ChapterSelector {
    readonly tag: string
    readonly selectorMap: Map<string, Selector> = new Map()

    current = ''
    next?: Selector
    isSelected = false
    root: PIXI.Container

    constructor(root: PIXI.Container) {
        this.tag = 'Chapter selector base'
        this.root = root
    }

    activate(): void {
        if (!this.isSelected) {
            this.root.visible = true
            this.root.updateTransform()
            this.next?.recursivelyActivate()
        }

        this.isSelected = true
    }

    selectContainer(name: string) {
        if (this.selectorMap.has(name)) {
            if (this.current !== name || !this.isSelected) {
                this.selectorMap.get(this.current)?.deactivate()
                const selector = this.selectorMap.get(name)
                selector.activate()
                this.current = name
            }
        }
    }

    deactivate() {
        if (this.isSelected) {
            this.next?.recursivelyDeactivate()
            this.isSelected = false
            this.selectorMap.get(this.current)?.deactivate()
            return new Promise<void>((resolve) => hideAnimation(this.root, resolve))
        }
    }

    addSelector(name: string, selector: Selector): void {
        this.selectorMap.set(name, selector)
    }

    append(selector: Selector): void {
        if (!this.next) {
            this.next = selector
        } else {
            this.next.append(selector)
        }
    }
}

const hideAnimation = (root: PIXI.Container, resolve: Function) => {
    const hideChapter = (): void => {
        if (root.alpha > 0) {
            root.alpha -= 0.05
        } else {
            boardApp.ticker.remove(hideChapter)
            root.visible = false
            root.alpha = 1
            resolve()
        }
    }

    boardApp.ticker.add(hideChapter)
}
