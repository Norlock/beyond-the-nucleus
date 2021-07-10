import { GameComponent } from 'src/components/base/GameComponent'
import { SelectorFactory } from 'src/factories/SelectorFactory'
import { MergeFlowSelector } from './MergeFlowSelector'
import { Selector } from './Selector'

export const MergeGameComponentSelector = (self: GameComponent) => {
    // First merge default flow selector
    MergeFlowSelector(self)

    const select = async () => {
        document.body.classList.add(self.tag)
    }

    const unselect = async () => {
        document.body.classList.remove(self.tag)
    }

    self.selector.append(SelectorFactory(new Selector('game')).setSelect(select).setUnselect(unselect).build())
}
