import {DefaultGameLoader} from "./DefaultGameLoader";

export interface GameLoader {
    init(): void;
    cleanup(): void;
}

export interface GameModule {
    game: DefaultGameLoader;
}
