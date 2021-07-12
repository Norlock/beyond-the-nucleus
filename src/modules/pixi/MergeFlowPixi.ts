import { FlowComponent } from 'src/components/base/FlowComponent'
import { StandardSelectorTag } from '../selector/Selector'
import { ComponentLineSelector } from './ComponentLine'
import { PixiSelector } from './Pixi'

export const MergePixiFlowCard = (self: FlowComponent, containerName: string, card: PixiSelector): void => {
    self.containerName = containerName
    self.card = card.component

    self.selector.append(card.selector)
    self.pixiComponents.push(card.component)
}

export const MergePixiFlowLine = (self: FlowComponent, previous: FlowComponent, color: number): void => {
    if (self.card) {
        const line = ComponentLineSelector(previous, self.card, color)
        self.line = line.component
        self.selector.insertBefore(line.selector, StandardSelectorTag.CARD)
        self.pixiComponents.push(line.component)
    }
}
