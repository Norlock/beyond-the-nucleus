export interface Keyboard {
    keyPressed(event: KeyboardEvent): void;
    keyUp(event: KeyboardEvent): void;
    keyDown(event: KeyboardEvent): void;
}

export interface KeyboardModule {
    keyboard: Keyboard;
}
