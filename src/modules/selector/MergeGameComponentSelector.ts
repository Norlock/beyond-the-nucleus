import { GameComponent } from 'src/components/base/GameComponent'
import { MergePixiSelector } from './MergePixiSelector'
import { Selector } from './Selector'

export const MergeGameComponentSelector = (self: GameComponent) => {
    // First merge default flow selector
    MergePixiSelector(self)

    const selector = new Selector('game')

    selector.activate = async () => {
        document.body.classList.add(self.id)
    }

    selector.idle = async () => {}

    selector.deactivate = async () => {
        document.body.classList.remove(self.id)
    }

    self.selector.append(selector)
}
