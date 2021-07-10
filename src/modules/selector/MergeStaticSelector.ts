import { StaticComponent } from 'src/components/base/StaticComponent'
import { chapters } from 'src/elm-bridge'
import { Selector } from './Selector'

export const MergeStaticSelector = (self: StaticComponent): void => {
    const selector = new Selector('Static selector base')
    const chapter = chapters.get(self.chapterId)

    selector.select = async () => {
        chapter.audio.selected?.fadeOut()
        setTimeout(() => {
            self.media.play()
        }, 1500)
    }

    selector.unselect = async () => {
        self.media.stop()
        chapter.audio.selected?.fadeIn()
    }

    self.selector = selector
}
