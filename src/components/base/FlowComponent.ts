import { FlowPixi } from '../../modules/pixi/Pixi'
import { Component } from './Component'

export class FlowComponent extends Component implements FlowPixi {
    containerName: string
    card: PIXI.Container
    line?: PIXI.Container
}
