import { Pixi, PixiModule } from '../../modules/pixi/Pixi';
import { Component } from './Component';
import { Flow } from 'src/modules/mover/Flow';

export class FlowComponent extends Component implements PixiModule {
    pixi: Pixi;
    mover: Flow;
}
