import { ChapterType } from './ChapterType'
import * as PIXI from 'pixi.js'
import { Chapter } from './Chapter'

export class PixiChapter extends Chapter {
    root: PIXI.Container

    constructor(chapterId: ChapterType) {
        super(chapterId)
        this.root = new PIXI.Container()
        this.root.sortableChildren = true
        this.root.visible = false
    }

    find(name: string): PIXI.Container {
        return this.root.children.find((x) => x.name === name) as PIXI.Container
    }
}
