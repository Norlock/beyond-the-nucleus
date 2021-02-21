export interface UI {
    toggleToolbar(): void;
    updateStep(index: number): void;
    isToolbarHidden(): boolean;
    showToolbar(): void;
    hideToolbar(): void;
    showVideoControl(): void;
    hideVideoControl(): void;
    hideAllControls(): void;
    toggleCanvasBlur(): void;
}

export interface UIModule {
    ui: UI;
}
