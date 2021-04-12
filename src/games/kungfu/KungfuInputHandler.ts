import {GameComponent} from "src/components/base/GameComponent";
import {InputHandler} from "src/modules/inputHandler/InputHandler";
import {ActionUI} from "src/utils/ActionTypes";

export const kungfuInputHandler = (self: GameComponent): InputHandler => {
    let isKeyDown: boolean;
    let keyPressed: string;


    const init = (): void => {
        const { stage } = self.game.app;

        const scroll = (): void => {
            if (isKeyDown) {
                switch (keyPressed) {
                    case ActionUI.LEFT:
                        stage.x += 10;
                    break;
                    case ActionUI.RIGHT:
                        stage.x -= 10;
                    break;
                    case ActionUI.UP:
                        stage.y += 10;
                    break;
                    case ActionUI.DOWN:
                        stage.y -= 10;
                    break;
                }
            }
        };

        self.game.app.ticker.add(scroll);
    }

    const keyUp = (event: KeyboardEvent): void => {
        isKeyDown = false;
    }

    const keyDown = (event: KeyboardEvent): void => {
        isKeyDown = true;

        keyPressed = event.key;
    }

    const keyPress = (event: KeyboardEvent): void => {
        console.log('keypress', event.key);
        if (event.key === "d") {
            const { devContainer } = self.resourceHandler;
            devContainer.visible = !devContainer.visible;
            self.game.app.render();
        } else if (event.key === "Escape") {
            self.game.cleanup();
        }
    }

    return {
        keyUp,
        keyDown,
        keyPress,
        init
    }
}
