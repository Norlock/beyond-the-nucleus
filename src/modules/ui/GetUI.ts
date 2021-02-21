import { UI, UIModule } from './UI';
import { Visibility } from '../../enums/Visibility';

const stepCounterElement = document.getElementById('page-number');
const videoControl = document.getElementById('video-control');
const toolbar = document.getElementById('toolbar');
const canvas = document.getElementById('pixi-canvas');

export const MergeUI = (self: UIModule): void => {
    self.ui = UIUtils;
};

const toggleToolbar = (): void => {
    if (isToolbarHidden()) {
        showToolbar();
    } else {
        hideToolbar();
    }
};

const updateStep = (index: number): void => {
    stepCounterElement.innerText = '' + index;
};

const isToolbarHidden = (): boolean => {
    return toolbar.classList.contains(Visibility.HIDE);
};

const showToolbar = (): void => {
    toolbar.classList.replace(Visibility.HIDE, Visibility.SHOW);
};

const hideToolbar = (): void => {
    toolbar.classList.replace(Visibility.SHOW, Visibility.HIDE);
};

const showVideoControl = (): void => {
    videoControl.classList.add(Visibility.SHOW);
};

const hideVideoControl = (): void => {
    videoControl.classList.remove(Visibility.SHOW);
};

const hideAllControls = (): void => {
    hideVideoControl();
};

const toggleCanvasBlur = (): void => {
    canvas.classList.toggle("blur");
}

export const UIUtils: UI = {
    hideToolbar,
    hideVideoControl,
    isToolbarHidden,
    showToolbar,
    showVideoControl,
    toggleToolbar,
    updateStep,
    hideAllControls,
    toggleCanvasBlur
};
