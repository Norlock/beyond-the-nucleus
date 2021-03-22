import {connectInputHandler} from 'src/modules/inputHandler/ConnectInputHandler';
import {InputHandler} from 'src/modules/inputHandler/InputHandler';
import { UIUtils } from 'src/modules/ui/GetUI';
import { pixiApp } from 'src/pixi/PixiApp';
import { ActionSelector, ActionUI, ActionUtil } from 'src/utils/ActionTypes';
import { Component } from './Component';
import { FlowComponent } from './FlowComponent';
import {GameComponent} from './GameComponent';
import { PartChainer } from './PartChainer';

const pixiCanvas = document.getElementById('pixi-canvas');

let inputHandler: InputHandler;

const init = (): void => {
    let currentComponent: Component;

    let keyPressed: string;
    let isKeyDown: boolean;
    let blocked = false;

    pixiCanvas.appendChild(pixiApp.view);

    const partChainer = PartChainer();
    const initial = partChainer.init("Zendo5");

    currentComponent = initial.component;
    currentComponent.chapter.selector.select(initial.component.pixi.containerName);
    currentComponent.selector.select(ActionSelector.NEXT);

    const scroll = (): void => {
        if (keyDown) {
            switch (keyPressed) {
                case ActionUI.LEFT:
                    pixiApp.stage.x += 10;
                    break;
                case ActionUI.RIGHT:
                    pixiApp.stage.x -= 10;
                    break;
                case ActionUI.UP:
                    pixiApp.stage.y += 10;
                    break;
                case ActionUI.DOWN:
                    pixiApp.stage.y -= 10;
                    break;
            }
        }
    };

    pixiApp.ticker.add(scroll);

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

    const keyPress = (event: KeyboardEvent) => {
         if (ActionUtil.isSelector(event.key)) {
             if (currentComponent instanceof GameComponent && event.key === ActionSelector.GAME) {
                 if (!currentComponent.game.busy) {
                     currentComponent.game.init();
                 } else {
                     currentComponent.game.cleanup();
                 }
             } else {
                 move(event.key as ActionSelector);
             }
         }  else if (ActionUtil.isUI(event.key)) {
             UIUtils.doAction(event.key);
         }

    }

    inputHandler = {
        keyPress,
        keyDown,
        keyUp
    };

    const move = async (action: ActionSelector) => {
        if (blocked) {
            return;
        } 

        blocked = true;

        const newComponent = currentComponent.mover.move(action);
        const isDifferent = currentComponent.tag !== newComponent.tag;

        if (isDifferent) {
            if (newComponent instanceof FlowComponent) {
                await newComponent.chapter.selector.select(newComponent.pixi.containerName);
                partChainer.load(newComponent.mover.index);
            }

            if (currentComponent.chapter.chapterType !== newComponent.chapter.chapterType) {
                await currentComponent.chapter.selector.unselect(action);
            }

            Promise.allSettled([
                currentComponent.selector.unselect(action),
                newComponent.selector.select(action),
                currentComponent = newComponent
            ]).then(() => blocked = false);
        }  
    };
};

export const ComponentManager = {
    init,
    connectInputHandler: () => connectInputHandler(inputHandler)
}


