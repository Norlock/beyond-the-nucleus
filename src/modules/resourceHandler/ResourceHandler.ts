import * as PIXI from 'pixi.js';

export interface ResourceHandler {
    load: () => Promise<PIXI.IResourceDictionary>;
    cleanup: () => void;
    devContainer: PIXI.Container;
}

export interface ResourcesModule {
    resourceHandler: ResourceHandler;
}
