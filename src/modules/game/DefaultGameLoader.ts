import * as PIXI from 'pixi.js';
import {boardApp} from 'src/pixi/PixiApp';
import {ActionSelector} from 'src/utils/ActionTypes';
import {UIUtils} from '../ui/GetUI';
import { GameLoader } from './GameLoader';

const gameCanvas = document.getElementById('game-canvas');

export class DefaultGameLoader implements GameLoader {
    private next: GameLoader;
    app: PIXI.Application; 
    finished: boolean;
    busy = false;

    init(): void {
        this.busy = true;

        UIUtils.showCanvasBlur();
        UIUtils.doAction(ActionSelector.GAME);

        // TODO rename to boardApp
        boardApp.stop();
        this.app = gameApp();

        gameCanvas.appendChild(this.app.view);

        this.next?.init();
    }

    cleanup(): void {
        this.next?.cleanup();

        gameCanvas.firstChild.remove();
        boardApp.start();

        UIUtils.doAction(ActionSelector.GAME);
        UIUtils.hideCanvasBlur();

        this.busy = false;
    }

    append(custom: GameLoader): void {
        this.next = custom;
    }
}


const gameApp = (): PIXI.Application => {
    console.log('canvas', gameCanvas.scrollWidth, gameCanvas.clientWidth);

    return new PIXI.Application({
        width: gameCanvas.clientWidth,
        height: gameCanvas.clientHeight,
        resizeTo: gameCanvas,
        resolution: window.devicePixelRatio || 1,
        antialias: true
    });
}
