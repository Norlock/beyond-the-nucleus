import { ActionType } from "src/utils/ActionTypes";

export interface UI {
    updateStep(index: number): void;
    hideAllControls(): void;
    showVideoControl(): void;
    hideVideoControl(): void;
    toggleCanvasBlur(): void;
    showPreviousControl(): void;
    hidePreviousControl(): void;
    showNextControl(): void;
    hideNextControl(): void;
    activateUIControl(action: ActionType): void;
    deactivateUIControl(action: ActionType): void;
}

export interface UIModule {
    ui: UI;
}
