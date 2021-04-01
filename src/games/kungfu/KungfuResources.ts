import * as PIXI from 'pixi.js';
import {GameComponent} from "src/components/base/GameComponent";
import {ResourceHandler} from 'src/modules/resourceHandler/ResourceHandler';
import {LOG} from "src/utils/Logger";
import {Promiser} from "src/utils/Promiser";

class KungfuResourceHandler implements  ResourceHandler {
    devContainer: PIXI.Container;
    load: () => Promise<PIXI.IResourceDictionary>;
    cleanup: () => void;
}

const TILE_SIZE = 48;

export const MergeKungfuResourceHandler = (self: GameComponent): void => {
    const resourceHandler = new KungfuResourceHandler();

    const load = () => {
        const promiser = Promiser<PIXI.IResourceDictionary>();
        const { app } = self.game;

        app.loader.baseUrl = 'src/assets/games/kungfu/tiles';

        for (let i = 1; i <= 128; i++) {
            app.loader.add(`tile${i}`, `tile${i}.png`);
        }

        app.loader.onError.add((err: any) => LOG.error(err));
        app.loader.load(loader => {
            devContainer(self, loader.resources);
            promiser.resolve(loader.resources);
        });

        return promiser.promise;
    };

    const cleanup = () => {
        self.game.app.loader.destroy();
    }

    resourceHandler.load = load;
    resourceHandler.cleanup = cleanup;

    self.resourceHandler = resourceHandler;
}

const devContainer = (self: GameComponent, resources: PIXI.IResourceDictionary): void => {
    const container = new PIXI.Container();

    let style = new PIXI.TextStyle({
        fill: "#FFFFFF",
        fontSize: 14
    });

    let widthIndex = 0;
    let heightIndex = 0;

    for (let i = 1; i <= 128; i++) {
        let xyText = new PIXI.Text("" + i, style);
        let tile = PIXI.Sprite.from(resources[`tile${i}`].texture);

        widthIndex++;

        if (widthIndex === 12) {
            widthIndex = 0;
            heightIndex++;
        }

        tile.x = widthIndex * TILE_SIZE + (widthIndex * 10);
        tile.y = heightIndex * TILE_SIZE + (heightIndex * 10);
        tile.addChild(xyText);
        container.addChild(tile);
    }

    container.name = "dev";
    self.game.app.stage.addChild(container);

    console.log('welcome from init!');

}
