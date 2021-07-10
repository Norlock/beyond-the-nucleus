import { ChapterSelect, ChapterSelector, Unselect } from 'src/modules/selector/Selector'

export const ChapterSelectorFactory = (self: ChapterSelector) => {
    const setSelect = (value: ChapterSelect) => {
        self.chapterSelect = value
        return factory
    }

    const setUnselect = (value: Unselect) => {
        self.unselect = value
        return factory
    }

    const build = (): ChapterSelector => {
        return self
    }

    const factory = {
        setSelect,
        setUnselect,
        build
    }

    return factory
}
