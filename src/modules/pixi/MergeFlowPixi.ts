import { PixiComponent } from 'src/components/base/PixiComponent'
import { StandardSelectorTag } from '../selector/Selector'
import { ComponentLineSelector } from './ComponentLine'
import { PixiSelector } from './Pixi'

export const MergePixiFlowCard = (self: PixiComponent, containerName: string, card: PixiSelector): void => {
    self.containerName = containerName
    self.card = card.component

    self.selector.append(card.selector)
    self.pixiComponents.push(card.component)
}

export const MergePixiFlowLine = (self: PixiComponent, previous: PixiComponent, color: number): void => {
    if (self.card) {
        const line = ComponentLineSelector(previous, self.card, color)
        self.line = line.component
        self.selector.insertBefore(line.selector, StandardSelectorTag.CARD)
        self.pixiComponents.push(line.component)
    }
}
