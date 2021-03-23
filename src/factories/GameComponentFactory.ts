import { Chapter } from 'src/chapters/base/Chapter';
import { FlowComponent } from 'src/components/base/FlowComponent';
import { GameComponent } from 'src/components/base/GameComponent';
import {GameLoader} from 'src/modules/game/GameLoader';
import {MergeDefaultGameLoader} from 'src/modules/game/MergeDefaultGameLoader';
import {InputHandler} from 'src/modules/inputHandler/InputHandler';
import { MergeFlowMover, MergeFlowMoverPrevious } from 'src/modules/mover/MergeFlowMover';
import { MergePixiFlowCard } from 'src/modules/pixi/MergeFlowPixi';
import { PixiSelector } from 'src/modules/pixi/Pixi';
import {Resources} from 'src/modules/resources/Resources';
import {MergeGameComponentSelector} from 'src/modules/selector/MergeGameComponentSelector';
import { MergeUI } from 'src/modules/ui/GetUI';

export class GameComponentFactory {
    readonly component: GameComponent;

    constructor(chapter: Chapter, tag: string) {
        this.component = new GameComponent(chapter);
        this.component.tag = tag;

        MergeUI(this.component);
        MergeGameComponentSelector(this.component);
        MergeDefaultGameLoader(this.component);
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

    mergeResources(resources: Resources) {
        this.component.resources = resources;
        return this;
    }

    mergeGameLoader(custom: GameLoader) {
        this.component.game.append(custom);
        return this;
    }

    mergeInputHandler(inputHandler: InputHandler) {
        this.component.inputHandler = inputHandler;
        return this;
    }
}
