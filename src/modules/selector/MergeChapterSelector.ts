import * as PIXI from 'pixi.js'
import { Chapter } from 'src/chapters/base/Chapter'
import { ChapterSelectorFactory } from 'src/factories/ChapterSelectorFactory'
import { boardApp } from 'src/pixi/PixiApp'
import { ChapterSelector } from './Selector'

export const MergeChapterSelector = (self: Chapter): void => {
    const selector = new ChapterSelector('Chapter selector base')

    const select = async (containerName: string) => {
        if (!selector.isSelected) {
            selector.isSelected = true
            self.root.visible = true

            selector.next?.select()
            self.root.updateTransform()
        }

        selector.containerSelector.select(containerName)
    }

    const unselect = async () => {
        if (selector.isSelected) {
            selector.isSelected = false
            selector.next?.unselect()

            return new Promise<void>((resolve) => hideAnimation(self.root, resolve))
        }
    }

    self.selector = ChapterSelectorFactory(selector).setSelect(select).setUnselect(unselect).build()
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
