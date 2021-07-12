import { ChapterType } from 'src/chapters/base/ChapterType'
import { FlowComponent } from 'src/components/base/FlowComponent'
import { MergePixiFlowCard, MergePixiFlowLine } from 'src/modules/pixi/MergeFlowPixi'
import { PixiParams } from 'src/modules/pixi/Pixi'
import { MergeFlowSelector } from 'src/modules/selector/MergeFlowSelector'

export function FlowComponentFactory(id: string, chapterId: ChapterType, pixiParams: PixiParams) {
    const component = new FlowComponent(id, chapterId)
    MergeFlowSelector(component)
    MergePixiFlowCard(component, pixiParams.containerName, pixiParams.card)

    const mergePixiLine = (previous: FlowComponent, color: number) => {
        MergePixiFlowLine(component, previous, color)
        return { component }
    }

    return { mergePixiLine, component }
}
