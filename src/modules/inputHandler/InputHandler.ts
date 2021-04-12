export interface InputHandler {
    keyPress: (event: KeyboardEvent) => void;
    keyUp: (event: KeyboardEvent) => void;
    keyDown: (event: KeyboardEvent) => void;
    init: () => void;
}

export interface InputHandlerModule {
    inputHandler: InputHandler;
}
