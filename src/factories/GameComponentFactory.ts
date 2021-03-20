import { Chapter } from 'src/chapters/base/Chapter';
import { FlowComponent } from 'src/components/base/FlowComponent';
import { GameComponent } from 'src/components/base/GameComponent';
import { Game, GameModule } from 'src/modules/game/Game';
import { Keyboard, KeyboardModule } from 'src/modules/keyboard/Keyboard';
import { MergeFlowMover, MergeFlowMoverPrevious } from 'src/modules/mover/MergeFlowMover';
import { MergePixiFlowCard, MergePixiFlowLine } from 'src/modules/pixi/MergeFlowPixi';
import { PixiSelector } from 'src/modules/pixi/Pixi';
import { MergeFlowSelector } from 'src/modules/selector/MergeFlowSelector';
import { MergeUI } from 'src/modules/ui/GetUI';

export class GameComponentFactory {
    readonly component: GameComponent;

    constructor(chapter: Chapter, tag: string) {
        this.component.tag = tag;
        MergeUI(this.component);
        MergeFlowSelector(this.component);
    }

    mergeMover(index: number): GameComponentFactory  {
        MergeFlowMover(this.component, index);
        return this;
    }

    mergePrevious(previous: FlowComponent): GameComponentFactory {
        MergeFlowMoverPrevious(this.component, previous)
        return this;
    }

    mergePixiCard(containerName: string, card: PixiSelector): GameComponentFactory {
        MergePixiFlowCard(this.component, containerName, card);
        return this;
    }

    mergeGame(game: Game) {
        this.component.game = game;
        return this;
    }

    mergeInputHandler(keyboard: Keyboard) {
        this.component.keyboard = keyboard;
        return this;
    }
}
