import * as PIXI from 'pixi.js';
import {GameComponent} from "src/components/base/GameComponent";
import {ResourceHandler} from 'src/modules/resourceHandler/ResourceHandler';
import {LOG} from "src/utils/Logger";
import {Promiser} from "src/utils/Promiser";
import {Grid} from './Grid';

export class KungfuResourceHandler implements ResourceHandler {
    resources: PIXI.IResourceDictionary;
    devContainer: PIXI.Container;
    load: () => Promise<void>;
    cleanup: () => void;

    characterGrid: Grid;
    backgroundGrid: Grid;
    readonly TILE_SIZE = 48;
}

export const MergeKungfuResourceHandler = (self: GameComponent): void => {
    const resourceHandler = new KungfuResourceHandler();

    const load = () => {
        const promiser = Promiser<void>();
        const { app } = self.game;

        app.loader.baseUrl = 'src/assets/games/kungfu';

        for (let i = 1; i <= 128; i++) {
            app.loader.add(`tile${i}`, `/tiles/tile${i}.png`);
        }

        // Player
        app.loader.add('idleEast','/player/KungFuIdle/NES_Kung_Fu_Man_Idle_EAST_strip4.png');
        app.loader.add('idleWest','/player/KungFuIdle/NES_Kung_Fu_Man_Idle_WEST_strip4.png');
        app.loader.add('idleNorth','/player/KungFuIdle/NES_Kung_Fu_Man_Idle_NORTH_strip4.png');
        app.loader.add('idleSouth','/player/KungFuIdle/NES_Kung_Fu_Man_Idle_SOUTH_strip4.png');
        app.loader.add('walkEast','/player/KungFuWalk/NES_Kung_Fu_Man_Walk_EAST_strip4.png');
        app.loader.add('walkWest','/player/KungFuWalk/NES_Kung_Fu_Man_Walk_WEST_strip4.png');
        app.loader.add('attackFSEast','/player/KungFuAttack/NES_Kung_Fu_Man_AttackFS_EAST_strip4.png');
        app.loader.add('attackFSWest','/player/KungFuAttack/NES_Kung_Fu_Man_AttackFS_WEST_strip4.png');
        //app.loader.add('attackFSEast','/player/KungFuAttack/NES_Kung_Fu_Man_AttackFS_strip4.png');
        //app.loader.add('attackFSEast','/player/KungFuAttack/NES_Kung_Fu_Man_AttackFS_strip4.png');

        app.loader.onError.add((err: any) => LOG.error(err));
        app.loader.load(loader => {
            self.resourceHandler.resources = loader.resources;
            devContainer(self);
            promiser.resolve();
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

const devContainer = (self: GameComponent): void => {
    const { resources, TILE_SIZE } = self.resourceHandler;
    const container = new PIXI.Container();
    container.visible = false;

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
    self.resourceHandler.devContainer = container;
}
