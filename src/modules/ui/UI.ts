import { Chapter } from "src/chapters/base/Chapter";
import { ActionUI } from "src/utils/ActionTypes";
import {ControlType} from "./GetUI";

export interface UI {
    updateStep(index: number): void;
    hideAllControls(): void;
    showControl(controlType: ControlType): void;
    hideControl(controlType: ControlType): void;
    showCanvasBlur(): void;
    hideCanvasBlur(): void;
    highlightUIControl(action: string): void;
    unhighlightUIControl(action: string): void;
    doUIAction(action: ActionUI): void;
    changeChapter(self: Chapter): void;
}

export interface UIModule {
    ui: UI;
}
