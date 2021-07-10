import * as PIXI from 'pixi.js'
import { Chapter } from 'src/chapters/base/Chapter'
import { boardApp } from 'src/pixi/PixiApp'
import { ChapterSelector } from './ChapterSelector'

export const MergeChapterSelector = (self: Chapter): void => {
    const selector = new ChapterSelector('Chapter selector base')

    selector.select = async (containerName: string) => {
        self.root.visible = true

        selector.next?.select()
        self.root.updateTransform()

        selector.containerSelector.select(containerName)
    }

    selector.unselect = async () => {
        selector.next?.unselect()

        return new Promise<void>((resolve) => hideAnimation(self.root, resolve))
    }

    self.selector = selector
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
