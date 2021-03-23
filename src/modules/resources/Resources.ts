import * as PIXI from 'pixi.js';

export interface Resources {
    load(): Promise<PIXI.IResourceDictionary>;
    cleanup(): void;
}

export interface ResourcesModule {
    resources: Resources;
}
