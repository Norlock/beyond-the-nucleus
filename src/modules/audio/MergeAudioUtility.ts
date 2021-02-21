import { AudioComponent, AudioModule, SelectState } from './AudioComponent';

export const MergeAudioUtility = (self: AudioModule): void => {
    const components: Map<string, AudioComponent> = new Map();
    let selected: AudioComponent;
    let shouldStop = false;

    const addComponent = (component: AudioComponent, tag: string) => {
        components.set(tag, component);
    };

    const getComponent = (tag: string): AudioComponent => {
        return components.get(tag);
    };

    const playAudio = (state: SelectState): void => {
        if (shouldStop) {
            return;
        }

        if (state === SelectState.fadeIn) {
            self.audio.selected.fadeIn();
        } else if (state === SelectState.play) {
            self.audio.selected.element.play();
        }
    }

    const select = (tag: string, state: SelectState, delay?: number): void => {
        if (self.audio.selected) {
            self.audio.selected.element.pause();
        }

        shouldStop = false;

        self.audio.selected = components.get(tag);

        if (delay) {
            setTimeout(() => playAudio(state), delay);
        } else {
            playAudio(state);
        }
    };

    const stop = (): void => {
        shouldStop = true;
        self.audio.selected?.element.pause();
    }

    self.audio = {
        addComponent,
        getComponent,
        select,
        selected,
        stop
    };
};
