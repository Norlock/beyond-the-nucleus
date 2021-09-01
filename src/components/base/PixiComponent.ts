import { FlowPixi } from '../../modules/pixi/Pixi'
import { Component } from './Component'
import * as PIXI from 'pixi.js'
import { chapters } from 'src/elm-bridge'
import { PixiChapter } from 'src/chapters/base/PixiChapter'

export class PixiComponent extends Component implements FlowPixi {
    readonly pixiComponents: PIXI.Container[] = []

    containerName: string
    card: PIXI.Container
    line?: PIXI.Container

    init() {
        const chapter = chapters.get(this.chapterId) as PixiChapter
        for (let item of this.pixiComponents) {
            chapter.root.addChild(item)
        }
    }
}
