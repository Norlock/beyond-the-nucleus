export interface Media {
    play(): void;
    stop(): void;
}

export interface MediaModule {
    media: Media;
}
