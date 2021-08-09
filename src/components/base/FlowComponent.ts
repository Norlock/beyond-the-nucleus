import { FlowPixi } from '../../modules/pixi/Pixi'
import { Component } from './Component'
import * as PIXI from 'pixi.js'

export class FlowComponent extends Component implements FlowPixi {
    containerName: string
    card: PIXI.Container
    line?: PIXI.Container
}
