type Init = () => void
type Cleanup = () => void

export class DefaultGameLoader implements GameLoader {
    init: Init
    cleanup: Cleanup
    next: GameLoader
    app: PIXI.Application
    finished: boolean
    busy = false

    append(custom: GameLoader): void {
        this.next = custom
    }
}

export interface GameLoader {
    init: Init
    cleanup: Cleanup
}

export interface GameModule {
    game: DefaultGameLoader
}
