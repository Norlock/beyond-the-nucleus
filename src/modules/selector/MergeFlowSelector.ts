import { FlowComponent } from 'src/components/base/FlowComponent';
import { SelectorFactory } from 'src/factories/SelectorFactory';
import { ActionSelector } from 'src/utils/ActionTypes';
import { GetAudio } from '../audio/GetAudio';
import { Selector } from './Selector';

const audio = GetAudio('/src/assets/audio/woosh.wav', false, 0.3).element;
const ctx = new AudioContext();
const filter = ctx.createBiquadFilter();
filter.frequency.value = 2020;
const media = ctx.createMediaElementSource(audio);
media.connect(filter);
filter.connect(ctx.destination);

export const FLOW_SELECTOR_TAG = "Flow selector";

export const MergeFlowSelector = (component: FlowComponent): void => {
    const selector = new Selector(FLOW_SELECTOR_TAG);

    const select = async (action: ActionSelector) => {
        try {
            if (!selector.isSelected) {
                selector.isSelected = true;

                component.mover.updateControls();
                audio.play();

                console.time();
                await selector.next?.recursivelySelect(action);
                console.timeEnd();
            }
        } finally {
            // Blocker is to avoid async components from being interrupted.
            component.mover.blocked = false;
        }
    };

    const unselect = async (action: ActionSelector) => {
        if (selector.isSelected) {
            selector.isSelected = false;

            await selector.next?.recursivelyUnselect(action);
        }
    };

    component.selector = SelectorFactory(selector)
        .setSelect(select)
        .setUnselect(unselect)
        .build();
};
