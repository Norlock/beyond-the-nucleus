import { ChapterType } from 'src/chapters/base/ChapterType'
import { FlowComponent } from 'src/components/base/FlowComponent'
import { MergePixiFlowCard, MergePixiFlowLine } from 'src/modules/pixi/MergeFlowPixi'
import { PixiSelector } from 'src/modules/pixi/Pixi'
import { MergeFlowSelector } from 'src/modules/selector/MergeFlowSelector'

export function FlowComponentFactory(tag: string, chapterId: ChapterType) {
    const component = new FlowComponent(tag, chapterId)
    MergeFlowSelector(component)

    const mergePixiCard = (containerName: string, card: PixiSelector) => {
        MergePixiFlowCard(component, containerName, card)
        return factory
    }

    const mergePixiLine = (previous: FlowComponent, color: number) => {
        MergePixiFlowLine(component, previous, color)
        return factory
    }

    const factory = {
        mergePixiCard,
        mergePixiLine,
        component
    }

    return factory
}
