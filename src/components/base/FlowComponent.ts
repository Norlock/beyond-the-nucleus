import { FlowPixi, PixiModule } from '../../modules/pixi/Pixi';
import { Component } from './Component';
import { Flow } from 'src/modules/mover/Flow';

export class FlowComponent extends Component implements PixiModule {
    pixi: FlowPixi;
    mover: Flow;
}
