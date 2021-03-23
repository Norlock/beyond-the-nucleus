import {GameComponent} from "src/components/base/GameComponent";
import {InputHandler} from "src/modules/inputHandler/InputHandler";

export const kungfuInputHandler = (self: GameComponent): InputHandler => {
    let isKeyDown: boolean;

    const keyUp = (event: KeyboardEvent): void => {
        isKeyDown = false;
        console.log('keyup :)');

    }

    const keyDown = (event: KeyboardEvent): void => {
        isKeyDown = true;
        console.log('keydown :O', event.key);

        if (event.key === "Escape") {
            self.game.cleanup();
        }
    }

    const keyPress = (event: KeyboardEvent): void => {
        console.log('keypress xD', event.key);
        //if (event.key === ""
    }

    return {
        keyUp,
        keyDown,
        keyPress
    }
}
