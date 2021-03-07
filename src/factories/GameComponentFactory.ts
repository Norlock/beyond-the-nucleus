import { Chapter } from 'src/chapters/base/Chapter';
import { FlowComponent } from 'src/components/base/FlowComponent';
import { GameModule } from 'src/modules/game/Game';
import { KeyboardModule } from 'src/modules/keyboard/Keyboard';
import { MergeFlowMover, MergeFlowMoverPrevious } from 'src/modules/mover/MergeFlowMover';
import { MergePixiFlowCard, MergePixiFlowLine } from 'src/modules/pixi/MergeFlowPixi';
import { PixiSelector } from 'src/modules/pixi/Pixi';
import { MergeFlowSelector } from 'src/modules/selector/MergeFlowSelector';
import { MergeUI } from 'src/modules/ui/GetUI';

export class GameComponentFactory {
    readonly component: GameComponent

    constructor(chapter: Chapter, tag: string) {
        this.component = new FlowComponent(chapter);
        component.
        this.component.tag = tag;
        MergeUI(this.component);
        MergeFlowSelector(this.component);
    }

    mergeMover(index: number): FlowComponentFactory  {
        MergeFlowMover(this.component, index);
        return this;
    }

    mergePrevious(previous: FlowComponent): FlowComponentFactory {
        MergeFlowMoverPrevious(this.component, previous)
        return this;
    }

    mergePixiCard(containerName: string, card: PixiSelector): FlowComponentFactory {
        MergePixiFlowCard(this.component, containerName, card);
        return this;
    }
}
