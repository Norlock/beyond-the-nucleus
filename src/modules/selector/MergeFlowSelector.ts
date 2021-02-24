import { FlowComponent } from 'src/components/base/FlowComponent';
import { SelectorFactory } from 'src/factories/SelectorFactory';
import { ActionSelector, ActionType } from 'src/utils/ActionTypes';
import { GetAudio } from '../audio/GetAudio';
import { Selector } from './Selector';

const audio = GetAudio('/src/assets/audio/woosh.wav', false, 0.3).element;
const ctx = new AudioContext();
const filter = ctx.createBiquadFilter();
filter.frequency.value = 2020;
const media = ctx.createMediaElementSource(audio);
media.connect(filter);
filter.connect(ctx.destination);

export const MergeFlowSelector = (component: FlowComponent): void => {
    const selector = new Selector("Flow selector");

    const select = async (action: ActionSelector) => {
        if (!selector.isSelected) {
            selector.isSelected = true;
            component.mover.blocked = true;

            component.mover.updateControls();
            audio.play();

            await selector.next?.recursivelySelect(action);

            // Blocker is to avoid too quick scrolling
            setTimeout(() => {
                component.mover.blocked = false;
            }, 500);
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
