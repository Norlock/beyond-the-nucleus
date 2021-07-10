export interface AudioComponent {
    element: HTMLAudioElement
    fadeIn: () => void
    fadeOut: () => void
}

export interface AudioUtility {
    addComponent(component: AudioComponent, tag: string): void
    getComponent(tag: string): AudioComponent
    select(tag: string, state: SelectState, delay?: number): void
    selected: AudioComponent
    stop(): void
}

export interface AudioModule {
    audio: AudioUtility
}

export enum SelectState {
    play,
    fadeIn,
    none
}
