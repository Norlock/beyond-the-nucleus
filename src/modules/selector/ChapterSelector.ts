import { Chapter } from 'src/chapters/base/Chapter'
import { boardApp } from 'src/pixi/PixiApp'
import { Selector } from './Selector'

export class ChapterSelector {
    readonly tag: string
    readonly selectorMap: Map<string, Selector> = new Map()

    current = ''
    next?: Selector
    isSelected = false
    chapter: Chapter

    constructor(chapter: Chapter) {
        this.tag = 'Chapter selector base'
        this.chapter = chapter
    }

    activate(): void {
        if (!this.isSelected) {
            this.chapter.root.visible = true
            this.chapter.root.updateTransform()
            this.next?.activate()
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
            this.next?.deactivate()
            this.isSelected = false
            this.selectorMap.get(this.current)?.deactivate()
            return new Promise<void>((resolve) => hideAnimation(this.chapter.root, resolve))
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
