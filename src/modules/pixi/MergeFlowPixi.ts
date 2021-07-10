import { FlowComponent } from 'src/components/base/FlowComponent'
import { StandardSelectorTag } from '../selector/Selector'
import { ComponentLineSelector } from './ComponentLine'
import { FlowPixi, PixiSelector } from './Pixi'

export const MergePixiFlowCard = (self: FlowComponent, containerName: string, card: PixiSelector): void => {
    self.pixi = new FlowPixi()
    self.pixi.containerName = containerName
    self.pixi.card = card.component

    self.chapter.root.addChild(card.component)
    self.selector.append(card.selector)
}

export const MergePixiFlowLine = (self: FlowComponent, previous: FlowComponent, color: number): void => {
    const line = ComponentLineSelector(previous, self.pixi.card, color)
    self.chapter.root.addChild(line.component)
    self.pixi.line = line.component
    self.selector.insertBefore(line.selector, StandardSelectorTag.CARD)
}
