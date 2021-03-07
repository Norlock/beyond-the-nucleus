import { ActionUI } from "src/utils/ActionTypes";

export interface UI {
    updateStep(index: number): void;
    hideAllControls(): void;
    showVideoControl(): void;
    hideVideoControl(): void;
    showCanvasBlur(): void;
    hideCanvasBlur(): void;
    showPreviousControl(): void;
    hidePreviousControl(): void;
    showNextControl(): void;
    hideNextControl(): void;
    highlightUIControl(action: string): void;
    unhighlightUIControl(action: string): void;
    doUIAction(action: ActionUI): void;
    setChapterTitle(title: string): void;
}

export interface UIModule {
    ui: UI;
}
