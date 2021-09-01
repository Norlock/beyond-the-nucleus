import { ChapterType } from 'src/chapters/base/ChapterType'
import { Selector, SelectorModule } from 'src/modules/selector/Selector'

export abstract class Component implements SelectorModule {
    readonly id: string
    readonly chapterId: ChapterType

    selector: Selector

    constructor(id: string, chapterId: ChapterType) {
        this.id = id
        this.chapterId = chapterId
    }

    abstract init(): void
}
