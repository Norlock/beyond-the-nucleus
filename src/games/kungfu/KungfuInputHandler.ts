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
        console.log('keypress', event.key);
        if (event.key === "d") {
            const { devContainer } = self.resourceHandler;
            devContainer.visible = !devContainer.visible;
            console.log('is visible', devContainer.visible);
            self.game.app.render();
        }
    }

    return {
        keyUp,
        keyDown,
        keyPress
    }
}
