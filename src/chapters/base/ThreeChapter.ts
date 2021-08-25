import { ChapterType } from './ChapterType'
import * as THREE from 'three'
import { Chapter } from './Chapter'

export class ThreeChapter extends Chapter {
    root: THREE.Scene
    //selector: ChapterSelector

    x: number
    y: number
    // TODO iets met camera

    constructor(chapterId: ChapterType) {
        super(chapterId)
        this.root = new THREE.Scene()
        this.root.visible = false
    }
}
