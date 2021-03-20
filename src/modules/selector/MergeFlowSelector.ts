import { FlowComponent } from 'src/components/base/FlowComponent';
import { SelectorFactory } from 'src/factories/SelectorFactory';
import { ActionSelector } from 'src/utils/ActionTypes';
import { GetAudio } from '../audio/GetAudio';
import { Selector, StandardSelectorTag } from './Selector';

// Selector Audio
const audio = GetAudio('/src/assets/audio/woosh.wav', false, 0.3).element;
const ctx = new AudioContext();
const filter = ctx.createBiquadFilter();
filter.frequency.value = 2020;
const media = ctx.createMediaElementSource(audio);
media.connect(filter);
filter.connect(ctx.destination);

export const MergeFlowSelector = (self: FlowComponent): void => {
    const selector = new Selector(StandardSelectorTag.FLOW);

    const select = async (action: ActionSelector) => {
        try {
            if (!selector.isSelected) {
                selector.isSelected = true;

                self.mover.updateControls();

                audio.load();
                audio.play();

                await selector.next?.recursivelySelect(action);
            }
        } finally {
            // Blocker is to avoid async components from being interrupted.
            self.mover.blocked = false;
        }
    };

    const unselect = async (action: ActionSelector) => {
        if (selector.isSelected) {
            selector.isSelected = false;

            await selector.next?.recursivelyUnselect(action);
        }
    };

    self.selector = SelectorFactory(selector)
        .setSelect(select)
        .setUnselect(unselect)
        .build();
};
