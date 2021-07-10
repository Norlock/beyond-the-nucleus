import * as PIXI from 'pixi.js'
import { Grid } from 'src/games/kungfu/Grid'

export interface ResourceHandler {
    load: () => Promise<void>
    cleanup: () => void
    devContainer: PIXI.Container
    resources: PIXI.IResourceDictionary
    characterGrid: Grid
    backgroundGrid: Grid

    readonly TILE_SIZE: number
}

export interface ResourcesModule {
    resourceHandler: ResourceHandler
}
