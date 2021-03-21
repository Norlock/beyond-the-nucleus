import {FlowComponent} from "src/components/base/FlowComponent";
import {FlowComponentFactory} from "src/factories/FlowComponentFactory";
import {GameComponentFactory} from "src/factories/GameComponentFactory";

export type BuildFunction = (factory: FlowComponentFactory | GameComponentFactory) => FlowComponent;
export type AttachPreviousFunction = (factory: FlowComponentFactory | GameComponentFactory, previous: FlowComponent) => void;

export enum LoaderType {
    FLOW,
    GAME
}

export interface PartLoader {
    buildComponent: () => FlowComponent;
    attachPreviousComponent(previous: FlowComponent): void;
}
