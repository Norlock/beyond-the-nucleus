import { FlowComponent } from 'src/components/base/FlowComponent';
import { FlowPixi, PixiParams } from './Pixi';

export const MergeFlowPixi = (self: FlowComponent, params: PixiParams): void => {
    const { card, line, containerName } = params;

    self.chapter.root.addChild(card.component);

    self.pixi = new FlowPixi();
    self.pixi.containerName = containerName; 
    self.pixi.card = card.component; 

    self.selector.appendSelector(card.selector)

    if (line) {
        self.chapter.root.addChild(line.component);
        self.pixi.line = line.component;
        self.selector.appendSelector(line.selector)
    }
};
