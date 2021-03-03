import { IndigenousChapter } from "../IndigenousChapter";
import { OceanChapter } from "../OceanChapter";
import { ZendoChapter } from "../ZendoChapter";
import { Chapter } from "./Chapter";
import { ChapterType } from "./ChapterType";

let ocean: Chapter;
let zendo: Chapter;
let indigenous: Chapter;

const get = (type: ChapterType): Chapter => {
    switch (type) {
        case ChapterType.OCEAN:
            return provide(ocean, OceanChapter);
        case ChapterType.ZEN:
            return provide(zendo, ZendoChapter);
        case ChapterType.INDIGENOUS:
            return provide(indigenous, IndigenousChapter);
    }
}

const provide = (source: Chapter, provider: () => Chapter): Chapter => {
    if (!source) {
        source = provider();
    }
    return source;
}

export const ChapterProvider = { get }
