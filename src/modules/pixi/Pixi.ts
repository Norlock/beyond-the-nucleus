import { Container } from 'pixi.js';

export interface Pixi {
    components: PixiFlowComponents;
    containerName: string;
    hideComponents(): void;
    scrollToComponent(): void;
    load(loadCount: number): void;
}

export interface PixiModule {
    pixi: Pixi;
}

export class PixiParams {
    containerName: string;
    components: PixiFlowComponents;
}

export interface PixiFlowComponents {
    card: Container;
    offset: Offset;
    bezier?: Container;
}

export interface CardOptions {
    x: number;
    y: number;
    width: number;
    height: number;
    borderColor?: number;
    pivotCenter: boolean;
    alpha?: number;
    radius?: number;
}

export interface Offset {
    x: number;
    y: number;
}
