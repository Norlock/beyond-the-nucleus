import {InputHandler} from "./InputHandler";

let inputHandler: InputHandler;

export const connectInputHandler = (self: InputHandler): void => {
    inputHandler = self;
}

document.addEventListener('keydown', (event: KeyboardEvent) => {
    inputHandler?.keyDown(event);
});

document.addEventListener('keyup', (event: KeyboardEvent) => {
    inputHandler?.keyUp(event);
});

document.addEventListener('keypress', (event: KeyboardEvent) => {
    inputHandler?.keyPress(event);
});
