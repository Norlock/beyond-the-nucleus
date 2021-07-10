import { Chapter } from 'src/chapters/base/Chapter'
import { Selector, SelectorModule } from 'src/modules/selector/Selector'

export abstract class Component implements SelectorModule {
    readonly chapter: Chapter
    selector: Selector
    tag: string

    constructor(chapter: Chapter) {
        this.chapter = chapter
    }
}
