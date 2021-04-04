import * as PIXI from 'pixi.js';

export interface ResourceHandler {
    load: () => Promise<void>;
    cleanup: () => void;
    devContainer: PIXI.Container;
    resources: PIXI.IResourceDictionary;
    readonly TILE_SIZE: number;
}

export interface ResourcesModule {
    resourceHandler: ResourceHandler;
}
