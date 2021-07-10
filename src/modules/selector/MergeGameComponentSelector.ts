import { GameComponent } from 'src/components/base/GameComponent'
import { MergeFlowSelector } from './MergeFlowSelector'
import { Selector } from './Selector'

export const MergeGameComponentSelector = (self: GameComponent) => {
    // First merge default flow selector
    MergeFlowSelector(self)

    const selector = new Selector('game')

    selector.select = async () => {
        document.body.classList.add(self.tag)
    }

    selector.unselect = async () => {
        document.body.classList.remove(self.tag)
    }

    self.selector.append(selector)
}
