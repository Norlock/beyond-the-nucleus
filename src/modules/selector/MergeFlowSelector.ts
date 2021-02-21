import { FlowComponent } from 'src/components/base/FlowComponent';
import { SelectorFactory } from 'src/factories/SelectorFactory';
import { ActionSelector, ActionType, ActionUtil } from 'src/utils/ActionTypes';
import { GetAudio } from '../audio/GetAudio';
import { Selector } from './Selector';

const audio = GetAudio('/src/assets/audio/woosh.wav', false, 0.3);
const ctx = new AudioContext();
const filter = ctx.createBiquadFilter();
filter.frequency.value = 2020;
const media = ctx.createMediaElementSource(audio.element);
media.connect(filter);
filter.connect(ctx.destination);

const LOAD_COUNT = 5;

export const MergeFlowSelector = (component: FlowComponent): void => {
    const selector = new Selector();

    const select = async (action: ActionType) => {
        if (!selector.isSelected) {
            selector.isSelected = true;
            component.mover.blocked = true;

            component.pixi.scrollToComponent();
            component.mover.updateControls();
            audio.element.play();

            await selector.next?.select();

            if (action === ActionSelector.NEXT) {
                component.pixi.load(LOAD_COUNT);
            }
        }
    };

    const unselect = async (action: ActionType) => {
        if (selector.isSelected) {
            selector.isSelected = false;

            await selector.next?.unselect();

            if (ActionUtil.isPrevious(action)) {
                component.pixi.hideComponents();
            }
        }
    };

    component.selector = SelectorFactory(selector)
        .setSelect(select)
        .setUnselect(unselect)
        .build();
};
