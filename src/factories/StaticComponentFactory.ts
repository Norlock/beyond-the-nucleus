import { Chapter } from 'src/chapters/base/Chapter'
import { StaticComponent } from 'src/components/base/StaticComponent'
import { MergeStaticSelector } from 'src/modules/selector/MergeStaticSelector'

export const StaticComponentFactory = (chapter: Chapter, tag: string) => {
    const self = new StaticComponent(chapter)
    self.tag = tag
    MergeStaticSelector(self)

    const factory = {
        component: self
    }

    return factory
}
