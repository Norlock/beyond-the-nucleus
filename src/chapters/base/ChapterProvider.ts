import { IndigenousChapter } from '../IndigenousChapter'
import { OceanChapter } from '../OceanChapter'
import { ZendoChapter } from '../ZendoChapter'
import { Chapter } from './Chapter'
import { ChapterType } from './ChapterType'

let ocean: Chapter
let zendo: Chapter
let indigenous: Chapter

const get = (type: ChapterType): Chapter => {
    switch (type) {
        case ChapterType.OCEAN:
            ocean = provide(ocean, OceanChapter)
            return ocean
        case ChapterType.ZEN:
            zendo = provide(zendo, ZendoChapter)
            return zendo
        case ChapterType.INDIGENOUS:
            indigenous = provide(indigenous, IndigenousChapter)
            return indigenous
    }
}

const provide = (source: Chapter, provider: () => Chapter): Chapter => {
    return source ?? provider()
}

export const ChapterProvider = { get }
