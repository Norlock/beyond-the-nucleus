import {GameComponent} from 'src/components/base/GameComponent';
import {SelectorFactory} from 'src/factories/SelectorFactory';
import {ControlType} from '../ui/GetUI';
import {MergeFlowSelector} from './MergeFlowSelector';
import {Selector} from './Selector';

export const MergeGameSelector = (self: GameComponent) => {
    // First merge default flow selector
    MergeFlowSelector(self);

    const select = async() => {
        document.body.classList.add(self.tag);
        self.ui.showControl(ControlType.GAME)
    }

    const unselect = async() => {
        document.body.classList.remove(self.tag);
    }

    self.selector.append(SelectorFactory(new Selector("game"))
        .setSelect(select)
        .setUnselect(unselect)
        .build());
}
