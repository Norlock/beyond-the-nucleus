import { ChapterType } from './ChapterType'
import * as THREE from 'three'
import { Chapter } from './Chapter'

export interface Coordinates {
    x: number
    y: number
    z: number
}

export class ThreeChapter extends Chapter {
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer

    constructor(chapterId: ChapterType, cameraCoordinates: Coordinates) {
        super(chapterId)

        this.scene = new THREE.Scene()
        this.scene.visible = false

        const { x, y, z } = cameraCoordinates
        this.camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 50)
        this.camera.position.set(x, y, z)

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        })

        this.renderer.setClearColor(0x078899)
        this.renderer.setSize(innerWidth, innerHeight)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.scene.add(this.camera)

        const canvas = document.getElementById('three-canvas')
        canvas.appendChild(this.renderer.domElement)
    }
}
