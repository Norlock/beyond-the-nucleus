import * as PIXI from 'pixi.js';
import { Selector } from '../selector/Selector';

export interface PixiModule {
    pixi: FlowPixi;
}

export class FlowPixi {
    containerName: string;
    card: PIXI.Container;
    line?: PIXI.Container;
}

export interface PixiParams {
    containerName: string;
    card: PixiSelector;
}

export interface PixiSelector { 
    component: PIXI.Container; 
    selector: Selector;
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
