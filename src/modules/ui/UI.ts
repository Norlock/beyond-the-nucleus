import { Chapter } from "src/chapters/base/Chapter";
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
    doAction(action: string): void;
    changeChapter(self: Chapter): void;
}

export interface UIModule {
    ui: UI;
}
