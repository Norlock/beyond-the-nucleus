export interface Game {
    finished: boolean;
    init(): void;
    cleanup(): void;
}

export interface GameModule {
    game: Game;
}
