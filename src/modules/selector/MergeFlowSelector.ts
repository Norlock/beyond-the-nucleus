import { FlowComponent } from 'src/components/base/FlowComponent';
import { SelectorFactory } from 'src/factories/SelectorFactory';
import { ActionSelector, ActionType } from 'src/utils/ActionTypes';
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

            // Blocker is set because you can bork the render processes by quick scrolling
            // And you want to wait for component animations to finish before allowing to continue
            setTimeout(() => {
                component.mover.blocked = false;
            }, 500);
        }
    };

    const unselect = async (action: ActionType) => {
        if (selector.isSelected) {
            selector.isSelected = false;

            await selector.next?.unselect();

            if (action === ActionSelector.PREVIOUS) {
                component.pixi.hideComponents();
            }
        }
    };

    component.selector = SelectorFactory(selector)
        .setSelect(select)
        .setUnselect(unselect)
        .build();
};
