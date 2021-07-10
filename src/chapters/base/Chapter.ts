import { ChapterType } from './ChapterType'
import * as PIXI from 'pixi.js'
import { Selector } from 'src/modules/selector/Selector'
import { AudioModule, AudioUtility } from 'src/modules/audio/AudioComponent'
import { ChapterSelector } from 'src/modules/selector/ChapterSelector'

export class Chapter implements AudioModule {
    readonly chapterId: ChapterType

    root: PIXI.Container
    selector: ChapterSelector
    audio: AudioUtility

    constructor(chapterId: ChapterType) {
        this.chapterId = chapterId
        this.root = new PIXI.Container()
        this.root.sortableChildren = true
        this.root.visible = false
    }

    find(name: string): PIXI.Container {
        return this.root.children.find((x) => x.name === name) as PIXI.Container
    }
}

export interface ContainerData {
    container: PIXI.Container
    name: string
    selector?: Selector
}
