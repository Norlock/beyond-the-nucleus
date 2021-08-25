import { Selector } from './Selector'
import * as THREE from 'three'
import { ChapterSelector } from './ChapterSelector'

export class ThreeChapterSelector implements ChapterSelector {
    readonly tag: string
    readonly selectorMap: Map<string, Selector> = new Map()

    current = ''
    next?: Selector
    isSelected = false
    scene: THREE.Scene

    constructor(scene: THREE.Scene) {
        this.tag = 'Chapter selector base'
        this.scene = scene
    }

    activate(): void {
        if (!this.isSelected) {
            this.scene.visible = true
            this.next?.recursivelyActivate()
        }

        this.isSelected = true
    }

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

    deactivate() {
        if (this.isSelected) {
            this.next?.recursivelyDeactivate()
            this.isSelected = false
            this.selectorMap.get(this.current)?.deactivate()
            return new Promise<void>((resolve) => hideAnimation(this.scene, resolve))
        }
    }

    addSelector(name: string, selector: Selector): void {
        this.selectorMap.set(name, selector)
    }

    append(selector: Selector): void {
        if (!this.next) {
            this.next = selector
        } else {
            this.next.append(selector)
        }
    }
}

const hideAnimation = (scene: THREE.Scene, resolve: Function) => {}
