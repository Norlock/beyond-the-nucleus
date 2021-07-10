import { FlowComponent } from 'src/components/base/FlowComponent'
import { MergePixiFlowCard, MergePixiFlowLine } from 'src/modules/pixi/MergeFlowPixi'
import { PixiSelector } from 'src/modules/pixi/Pixi'
import { MergeFlowSelector } from 'src/modules/selector/MergeFlowSelector'

export class FlowComponentFactory {
    readonly component: FlowComponent

    constructor(tag: string) {
        this.component = new FlowComponent(tag)
        MergeFlowSelector(this.component)
    }

    mergePixiCard(containerName: string, card: PixiSelector): FlowComponentFactory {
        MergePixiFlowCard(this.component, containerName, card)
        return this
    }

    mergePixiLine(previous: FlowComponent, color: number): FlowComponentFactory {
        MergePixiFlowLine(this.component, previous, color)
        return this
    }
}
