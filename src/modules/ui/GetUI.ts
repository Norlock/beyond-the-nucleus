import { UI, UIModule } from './UI';
import { Visibility } from '../../enums/Visibility';
import { ActionSelector, ActionType, ActionUI } from 'src/utils/ActionTypes';

const stepCounterElement = document.getElementById('page-number');
const videoControl = document.getElementById('video-control');
const previousControl = document.getElementById('previous-control');
const nextControl = document.getElementById('next-control');
const helpControl = document.getElementById('help-control');
const canvas = document.getElementById('pixi-canvas');

export const MergeUI = (self: UIModule): void => {
    self.ui = UIUtils;
};

const updateStep = (index: number): void => {
    stepCounterElement.innerText = '' + index;
};

const showVideoControl = (): void => {
    videoControl.classList.add(Visibility.SHOW);
};

const hideVideoControl = (): void => {
    videoControl.classList.remove(Visibility.SHOW);
};

const showPreviousControl = (): void => {
    previousControl.classList.remove(Visibility.HIDE);
}

const hidePreviousControl = (): void => {
    previousControl.classList.add(Visibility.HIDE);
}

const showNextControl = (): void => {
    nextControl.classList.remove(Visibility.HIDE);
}

const hideNextControl = (): void => {
    nextControl.classList.add(Visibility.HIDE);
}

const hideAllControls = (): void => {
    hideVideoControl();
    hideNextControl();
    hidePreviousControl();
};

const ACTIVATE = "activate";

const activateUIControl = (action: ActionType): void => {
    if (action === ActionUI.TOGGLE_HELP) {
        helpControl.classList.add(ACTIVATE);
    } else if (action === ActionSelector.NEXT) {
        nextControl.classList.add(ACTIVATE);
    } else if (action === ActionSelector.PREVIOUS) {
        previousControl.classList.add(ACTIVATE);
    }
}

const deactivateUIControl = (action: ActionType): void => {
    if (action === ActionUI.TOGGLE_HELP) {
        helpControl.classList.remove(ACTIVATE)
    } else if (action === ActionSelector.NEXT) {
        nextControl.classList.remove(ACTIVATE)
    } else if (action === ActionSelector.PREVIOUS) {
        previousControl.classList.remove(ACTIVATE)
    }
}

const toggleCanvasBlur = (): void => {
    canvas.classList.toggle("blur");
}

export const UIUtils: UI = {
    hideVideoControl,
    showVideoControl,
    showPreviousControl,
    hideNextControl,
    hidePreviousControl,
    showNextControl,
    updateStep,
    hideAllControls,
    toggleCanvasBlur,
    activateUIControl,
    deactivateUIControl
};
