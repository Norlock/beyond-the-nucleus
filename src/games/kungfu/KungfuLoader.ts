import * as PIXI from 'pixi.js';
import {GameComponent} from "src/components/base/GameComponent";
import {GameLoader} from "src/modules/game/GameLoader";

export const kungfuLoader = (self: GameComponent): GameLoader => {
    const init = async () => {
        const resources = await self.resources.load();

        const sprite = new PIXI.Sprite(resources.NatureEnvironment.texture);
        self.game.app.stage.addChild(sprite);
        

        console.log('welcome from init!');
    }
    
    const cleanup = () => {
        self.resources.cleanup();

    }

    return {
        init,
        cleanup
    }
}
