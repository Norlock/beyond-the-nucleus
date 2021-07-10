import { ChapterType } from 'src/chapters/base/ChapterType'
import { StaticComponent } from 'src/components/base/StaticComponent'
import { MergeStaticSelector } from 'src/modules/selector/MergeStaticSelector'

export const StaticComponentFactory = (chapterid: ChapterType, tag: string) => {
    const self = new StaticComponent(tag, chapterid)
    MergeStaticSelector(self)

    return self
}
