import * as PIXI from 'pixi.js';
import {GameComponent} from "src/components/base/GameComponent";
import {connectInputHandler} from 'src/modules/inputHandler/ConnectInputHandler';
import {InputHandler} from "src/modules/inputHandler/InputHandler";

// TODO
export class Player extends PIXI.Sprite {
    health: number;
    weapon: any;

    private constructor() {
        super();
    }

    static create = (component: GameComponent): Player => {
        const self = new Player();
        component.inputHandler = inputHandler(self, component);
        connectInputHandler(component.inputHandler);
        return self;
    }
}

const inputHandler = (player: Player, component: GameComponent): InputHandler => {
    let isKeyDown: boolean;
    let keyPressed: string;

    const { stage } = component.game.app;

    const scroll = (): void => {
        if (isKeyDown) {
            switch (keyPressed) {
                case 'a':
                    player.x -= 10;
                    stage.x += 10;
                break;
                case 'd':
                    player.x += 10;
                    stage.x -= 10;
                break;
                case 'w':
                    player.y -= 10;
                    stage.y += 10;
                break;
                case 's':
                    player.y += 10;
                    stage.y -= 10;
                break;
            }
        }
    };

    component.game.app.ticker.add(scroll);

    const keyUp = (event: KeyboardEvent): void => {
        isKeyDown = false;
    }

    const keyDown = (event: KeyboardEvent): void => {
        isKeyDown = true;

        keyPressed = event.key;
    }

    const keyPress = (event: KeyboardEvent): void => {
        console.log('keypress', event.key);
        if (event.key === "\\") {
            const { devContainer } = component.resourceHandler;
            devContainer.visible = !devContainer.visible;
            component.game.app.render();
        } else if (event.key === "Escape") {
            component.game.cleanup();
        }
    }

    return {
        keyUp,
        keyDown,
        keyPress,
    }
}
