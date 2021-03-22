import { Chapter } from 'src/chapters/base/Chapter';
import { FlowComponent } from 'src/components/base/FlowComponent';
import { GameComponent } from 'src/components/base/GameComponent';
import {DefaultGameLoader} from 'src/modules/game/DefaultGameLoader';
import {GameLoader} from 'src/modules/game/GameLoader';
import {InputHandler} from 'src/modules/inputHandler/InputHandler';
import { MergeFlowMover, MergeFlowMoverPrevious } from 'src/modules/mover/MergeFlowMover';
import { MergePixiFlowCard } from 'src/modules/pixi/MergeFlowPixi';
import { PixiSelector } from 'src/modules/pixi/Pixi';
import {MergeGameSelector} from 'src/modules/selector/MergeGameSelector';
import { MergeUI } from 'src/modules/ui/GetUI';

export class GameComponentFactory {
    readonly component: GameComponent;

    constructor(chapter: Chapter, tag: string) {
        this.component = new GameComponent(chapter);
        this.component.tag = tag;
        this.component.game = new DefaultGameLoader(); 

        MergeUI(this.component);
        MergeGameSelector(this.component);
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

    appendGameLoader(custom: GameLoader) {
        this.component.game.append(custom);
        return this;
    }

    mergeInputHandler(inputHandler: InputHandler) {
        this.component.inputHandler = inputHandler;
        return this;
    }
}
