import { ChapterType } from './ChapterType'
import * as PIXI from 'pixi.js'
import { Selector } from 'src/modules/selector/Selector'
import { AudioModule, AudioUtility } from 'src/modules/audio/AudioComponent'
import { ChapterSelector } from 'src/modules/selector/ChapterSelector'

export abstract class Chapter implements AudioModule {
    readonly chapterId: ChapterType

    selector: ChapterSelector
    audio: AudioUtility

    constructor(chapterId: ChapterType) {
        this.chapterId = chapterId
    }
}

export interface ContainerData {
    container: PIXI.Container
    name: string
    selector?: Selector
}
