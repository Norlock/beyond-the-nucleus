import { ZendoChapter } from 'src/chapters/ZendoChapter';
import { UIUtils } from 'src/modules/ui/GetUI';
import { pixiApp } from 'src/pixi/PixiApp';
import { ActionSelector, ActionUI, ActionUtil } from 'src/utils/ActionTypes';
import { OceanPart1 } from '../ocean/OceanPart1';
import { ZendoPart1 } from '../zendo/ZendoPart1';
import { ZendoPart4 } from '../zendo/ZendoPart4';
import { Component } from './Component';
import { FlowComponent } from './FlowComponent';
import { PartChainer } from './PartChainer';

const LOAD_COUNT = 4;

export const initComponentManager = (): void => {
    let currentComponent: Component;

    const pixiCanvas = document.getElementById('pixi-canvas');
    let keyPressed: string;
    let keyDown: boolean;

    pixiCanvas.appendChild(pixiApp.view);

    const root = new ZendoPart1(undefined);
    //const root = new OceanPart1();
    const partChainer = PartChainer(root, LOAD_COUNT);

    currentComponent = root.component;
    currentComponent.chapter.selector.select(root.component.pixi.containerName);
    currentComponent.selector.select(ActionSelector.NEXT);

    const scroll = (): void => {
        if (keyDown) {
            switch (keyPressed) {
                case 'ArrowLeft':
                    pixiApp.stage.x += 10;
                    break;
                case 'ArrowRight':
                    pixiApp.stage.x -= 10;
                    break;
                case 'ArrowUp':
                    pixiApp.stage.y += 10;
                    break;
                case 'ArrowDown':
                    pixiApp.stage.y -= 10;
                    break;
            }
        }
    };

    pixiApp.ticker.add(scroll);

    document.addEventListener('keydown', (event: KeyboardEvent) => {
        keyPressed = event.key;
        keyDown = true;

        const action = ActionUtil.getType(event.key);
        if (!action) return;

        if (ActionUtil.isSelector(action)) {
            move(action as ActionSelector);
        } else if (action === ActionUI.TOGGLE_TOOLBAR) {
            UIUtils.toggleToolbar();
        }
    });

    const move = async (action: ActionSelector) => {
        const newComponent = currentComponent.mover.move(action);

        if (currentComponent !== newComponent) {
            if (newComponent instanceof FlowComponent) {
                await newComponent.chapter.selector.select(newComponent.pixi.containerName);
                partChainer.load(newComponent.mover.index);
            }

            if (currentComponent.chapter.chapterType !== newComponent.chapter.chapterType) {
                await currentComponent.chapter.selector.unselect(action);
            }

            await newComponent.selector.select(action);
            await currentComponent.selector.unselect(action);

            currentComponent = newComponent;

        }
    };
};
