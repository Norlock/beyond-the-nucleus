import * as PIXI from 'pixi.js';
import {GameComponent} from "src/components/base/GameComponent";
import {Resources} from 'src/modules/resources/Resources';
import {LOG} from "src/utils/Logger";
import {Promiser} from "src/utils/Promiser";

export const kungfuResources = (self: GameComponent): Resources => {
    const load = () => {
        const promiser = Promiser<PIXI.IResourceDictionary>();
        const { app } = self.game;

        app.loader.baseUrl = 'src/assets/games/kungfu';
        app.loader
        .add('NatureEnvironment', 'Nature_environment_01.png');

        app.loader.onError.add((err: any) => LOG.error(err));
        app.loader.load(loader => {
            console.log('env', loader);
            promiser.resolve(loader.resources);
        });

        return promiser.promise;
    };

    const cleanup = () => {
        self.game.app.loader.destroy();
    }

    return {
        load,
        cleanup
    }

}
