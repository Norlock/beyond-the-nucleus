import * as PIXI from 'pixi.js';
import {GameComponent} from "src/components/base/GameComponent";
import {GameLoader} from "src/modules/game/GameLoader";

export const kungfuLoader = (self: GameComponent): GameLoader => {
    const init = async () => {
        const resources = await self.resourceHandler.load();

        self.game.app.stage.addChild(self.resourceHandler.devContainer);

        console.log('welcome from init!');
    }
    
    const cleanup = () => {
        self.resourceHandler.cleanup();
    }

    return {
        init,
        cleanup
    }
}
