import {UIUtils} from "../ui/GetUI";
import {InputHandler} from "./InputHandler";

export type KeyPressFunction = (event: KeyboardEvent) => void;

export const defaultInputHandler = (keyPress: KeyPressFunction): InputHandler => {
    let keyPressed: string;
    let isKeyDown: boolean;

    const keyUp = (): void => {
        isKeyDown = false;

        UIUtils.unhighlightUIControl(keyPressed);
    }

    const keyDown = (event: KeyboardEvent): void => {
        if (isKeyDown && event.key !== keyPressed) return;

        isKeyDown = true;
        keyPressed = event.key;

        UIUtils.highlightUIControl(event.key);
    }

    const init = () => {};

    return {
        keyUp,
        keyDown,
        keyPress,
        init
    };
}
