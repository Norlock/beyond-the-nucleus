import { ChapterType } from 'src/chapters/base/ChapterType'
import { Selector, SelectorModule } from 'src/modules/selector/Selector'
import * as PIXI from 'pixi.js'

export class Component implements SelectorModule {
    readonly id: string
    readonly chapterId: ChapterType
    readonly pixiComponents: PIXI.Container[] = []

    selector: Selector

    constructor(id: string, chapterId: ChapterType) {
        this.id = id
        this.chapterId = chapterId
    }
}
