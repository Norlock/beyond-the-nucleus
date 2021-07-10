import { StaticComponent } from 'src/components/base/StaticComponent'
import { SelectorFactory } from 'src/factories/SelectorFactory'
import { Selector } from './Selector'

export const MergeStaticSelector = (self: StaticComponent): void => {
    const selector = new Selector('Static selector base')

    const select = async () => {
        if (!selector.isSelected) {
            selector.isSelected = true
            self.chapter.audio.selected?.fadeOut()
            setTimeout(() => {
                self.media.play()
            }, 1500)
        }
    }

    const unselect = async () => {
        selector.isSelected = false
        self.media.stop()
        self.chapter.audio.selected?.fadeIn()
    }

    self.selector = SelectorFactory(selector).setSelect(select).setUnselect(unselect).build()
}
