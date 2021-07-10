import { FlowPixi, PixiModule } from '../../modules/pixi/Pixi'
import { Component } from './Component'

export class FlowComponent extends Component implements PixiModule {
    pixi: FlowPixi
}
