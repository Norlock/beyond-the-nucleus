import * as THREE from 'three'
import { ChapterType } from 'src/chapters/base/ChapterType'
import { ThreeComponent } from 'src/components/base/ThreeComponent'
import { MergeThreeSelector } from 'src/modules/selector/MergeThreeSelector'
import { Selector } from 'src/modules/selector/Selector'

export const ThreeComponentFactory = (id: string, chapterId: ChapterType) => {
    const component = new ThreeComponent(id, chapterId)
    MergeThreeSelector(component)

    const appendSelector = (selector: Selector) => {
        component.selector.append(selector)
    }

    const setCard = (card: THREE.Group | THREE.Mesh) => {
        component.card = card
    }

    return { appendSelector, setCard, component }
}
