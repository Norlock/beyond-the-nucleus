import { Component } from 'src/components/base/Component';
import { FlowComponent } from 'src/components/base/FlowComponent';
import { Move } from './Move';

export interface Flow extends Move {
    // Next nodes can be flow or static
    nextNodes: Component[];

    // Previous is always flow
    readonly previous?: FlowComponent;
    readonly index: number;

    isRoot(): boolean;
    updateControls(): void;
}

// Atlantic.net lets check it out later
