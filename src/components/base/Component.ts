import { Chapter } from 'src/chapters/base/Chapter'
import { Move, MoveModule } from 'src/modules/mover/Move'
import { Selector, SelectorModule } from 'src/modules/selector/Selector'
import { UI, UIModule } from 'src/modules/ui/UI'

export abstract class Component implements UIModule, SelectorModule, MoveModule {
    readonly chapter: Chapter
    selector: Selector
    mover: Move
    tag: string

    constructor(chapter: Chapter) {
        this.chapter = chapter
    }
}
