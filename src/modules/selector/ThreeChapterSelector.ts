import { Selector } from './Selector'
import * as THREE from 'three'
import { ThreeChapter } from 'src/chapters/base/ThreeChapter'

export const MergeThreeChapterSelector = (chapter: ThreeChapter) => {
    const canvas = document.getElementById('three-canvas')

    const selector = new ThreeChapterSelector('Three chapter selector')
    selector.activate = async () => {
        canvas.appendChild(chapter.renderer.domElement)
        if (!selector.isSelected) {
            chapter.scene.visible = true
            selector.next?.recursivelyActivate()
        }

        selector.isSelected = true
    }

    selector.deactivate = async () => {
        canvas.removeChild(chapter.renderer.domElement)

        if (selector.isSelected) {
            selector.next?.recursivelyDeactivate()
            selector.isSelected = false
            selector.selectorMap.get(selector.current)?.deactivate()
            return new Promise<void>((resolve) => hideAnimation(chapter.scene, resolve))
        }
    }

    return selector
}

let input = ''
let activated = false

export const boardScroll = (direction: string) => {
    input = direction
}

const activateScroll = (chapter: ThreeChapter) => {
    const camera = chapter.camera
    activated = true
    const scroll = () => {
        switch (input) {
            case 'left':
                camera.position.x += 2
                break
            case 'right':
                camera.position.x -= 2
                break
            case 'up':
                camera.position.y += 2
                break
            case 'down':
                camera.position.y -= 2
                break
        }

        requestAnimationFrame(scroll)
    }
}

class ThreeChapterSelector extends Selector {
    readonly selectorMap: Map<string, Selector> = new Map()

    current = ''
    isSelected = false

    selectContainer(name: string) {
        if (this.selectorMap.has(name)) {
            if (this.current !== name || !this.isSelected) {
                this.selectorMap.get(this.current)?.deactivate()
                const selector = this.selectorMap.get(name)
                selector.activate()
                this.current = name
            }
        }
    }

    addSelector(name: string, selector: Selector): void {
        this.selectorMap.set(name, selector)
    }
}

const hideAnimation = (scene: THREE.Scene, resolve: Function) => {}
