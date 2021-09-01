import { Component } from './Component'
import * as THREE from 'three'
import { chapters } from 'src/elm-bridge'
import { ThreeChapter } from 'src/chapters/base/ThreeChapter'

export class ThreeComponent extends Component {
    containerName: string
    card: THREE.Group

    init() {
        const chapter = chapters.get(this.chapterId) as ThreeChapter
        chapter.scene.add(this.card)
    }
}
