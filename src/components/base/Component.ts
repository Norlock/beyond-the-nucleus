import { ChapterType } from 'src/chapters/base/ChapterType'
import { chapters } from 'src/elm-bridge'
import { Selector, SelectorModule } from 'src/modules/selector/Selector'
import * as PIXI from 'pixi.js'

export class Component implements SelectorModule {
    readonly tag: string
    readonly chapterId: ChapterType
    readonly pixiComponents: PIXI.Container[] = []

    selector: Selector

    constructor(tag: string, chapterId: ChapterType) {
        this.tag = tag
        this.chapterId = chapterId
    }

    init() {
        const chapter = chapters.get(this.chapterId)
        for (let item of this.pixiComponents) {
            chapter.root.addChild(item)
        }
    }
}
